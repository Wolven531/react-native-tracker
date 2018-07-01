import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Button, Slider } from 'react-native-elements'
import { Camera } from 'expo'

import {
	setActiveCamera,
	setCameraZoom,
	setFacesDetected,
	setPhoto
} from '../actions'
import { BASE_64_PREFIX } from '../constants/strings'

import { styles } from '../styles'

// NOTE: Regarding rendering images in react native:
// Image is for simple image display
// ImageBackground is for nesting things inside the image
const landmarkSize = 5
const localStyles = {
	buttonSwitchCamera: {
		backgroundColor: '#fa0',
		borderRadius: 99999,
		// marginHorizontal: 0
	},
	camera: {
		flex: 1,
		overflow: 'hidden',
	},
	cameraRenderer: {
		alignItems: 'stretch',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		paddingBottom: 10
	},
	cameraTouchable: {
		alignSelf: 'flex-end',
		backgroundColor: 'rgba(200,200,200,.65)',
		// TODO: figure out why js file can use '100%',
		// but this file must use number
		borderRadius: 99999,
		flex: 1,
		margin: 20,
		maxHeight: 80,
		width: 80,
	},
	face: {
		backgroundColor: 'rgba(0, 0, 0, 0.65)',
		borderColor: '#fa0',
		borderWidth: 2,
	},
	landmark: {
		backgroundColor: '#0f0',
		height: landmarkSize,
		position: 'absolute',
		width: landmarkSize
	},
	zoomPanel: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,.5)',
		borderColor: '#ccc',
		borderWidth: 1,
		flexDirection: 'row',
		height: 50,
		justifyContent: 'space-between',
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		paddingLeft: 10
	}
}

const takePicture = (cam, targetStore) => {
	cam.takePictureAsync({
		quality: 0.1,
		base64: true,
		exif: false
	}).then(photo => {
		targetStore.dispatch(setPhoto(photo))
	})
}

const renderLandmark = (position, origin) => {
	if (!position) {
		return null
	}
	const newX = position.x - landmarkSize / 2
	const newY = position.y - landmarkSize / 2
	console.log(`face is at x=${origin.x},y=${origin.y}; point is at  ${JSON.stringify(position)}`)
	console.log(`rendering point at x=${newX},y=${newY}`)
	return (
		<View
			style={[
				styles.landmark,
				{
					left: newX,
					top: newY,
				}
			]} />
	)
}

class CameraRenderer extends React.Component {
	constructor(props) {
		super(props)
		this.state = props.store.getState()
		props.store.subscribe(() => {
			const { activeCamera, cameraZoom, detectedFaces, photo } = this.props.store.getState()
			this.setState({
				activeCamera,
				cameraZoom,
				detectedFaces,
				photo
			})
		})
	}

	render() {
		return (
			<View style={localStyles.cameraRenderer}>
				<View style={{
					backgroundColor: '#444',
					flex: 1,
					margin: 10
				}}>
					{this.state.activeCamera &&
						<Camera
							style={localStyles.camera}
							type={this.state.activeCamera}
							ref={cam => this.camera = cam}
							zoom={this.state.cameraZoom}
							faceDetectionClassifications={Camera.Constants.FaceDetection.Classifications.all}
							faceDetectionLandmarks={Camera.Constants.FaceDetection.Landmarks.all}
							faceDetectionMode={Camera.Constants.FaceDetection.Mode.accurate}// or .fast
							// onBarCodeRead={barCodeData => {
							// 	console.log(`Got barcode in camera=${JSON.stringify(barCodeData, null, 4)}`)
							// }}
							onFacesDetected={faceData => this._handleFacesDetected(faceData, this.camera)}>
							{this.state.detectedFaces &&
								<View
									style={[
										localStyles.face,
										{
											// ...this.state.detectedFaces.faces[0].bounds.size,// for width and height
											height: this.state.detectedFaces.faces[0].bounds.size.height,
											width: this.state.detectedFaces.faces[0].bounds.size.width,
											// position: 'absolute',
											left: this.state.detectedFaces.faces[0].bounds.origin.x,
											top: this.state.detectedFaces.faces[0].bounds.origin.y / 2,
											// top: 0
										}
									]}
									// transform={[
									// 	{ perspective: 1000 },
									// 	{ rotateY: `${this.state.detectedFaces.faces[0].yawAngle.toFixed(0)}deg` },
									// 	{ rotateZ: `${this.state.detectedFaces.faces[0].rollAngle.toFixed(0)}deg` },
									// ]}
									>
									{renderLandmark(this.state.detectedFaces.faces[0].leftEyePosition, this.state.detectedFaces.faces[0].bounds.origin)}
									{renderLandmark(this.state.detectedFaces.faces[0].rightEyePosition, this.state.detectedFaces.faces[0].bounds.origin)}
									{/* <View style={
										{
											backgroundColor: 'rgba(255,0,0,.5)',
											bottom: 0,
											left: 0,
											position: 'absolute',
											right: 0,
											top: 0,
										}
									}>
									</View> */}
								</View>
							}
							{/*
							<TouchableOpacity style={localStyles.cameraTouchable}
								onPress={() => { takePicture(this.camera, this.props.store) }}/>
							*/}
						</Camera>
					}
				</View>
				<View style={localStyles.zoomPanel}>
					<Text style={[ styles.textWhite, { width: 110 } ]}>
						Zoom: {((this.state.cameraZoom + 1.0) * 100.0).toFixed(2)}%
					</Text>
					<Slider
						animateTransitions={true}
						animationType={'spring'}
						maximumValue={110}
						minimumValue={100}
						onValueChange={newValue => {
							const actualZoom = (newValue - 100.0) / 100.0
							this.props.store.dispatch(setCameraZoom(actualZoom))
						}}
						step={0.05}
						value={(this.state.cameraZoom + 1.0) * 100.0}
						style={[
							{
								flex: 1,
								marginLeft: 10,
								marginRight: 30
							}
						]}
					/>
				</View>
				<Button buttonStyle={localStyles.buttonSwitchCamera} title="Switch Camera"
					onPress={this._switchCamera} />]
			</View>
		)
	}

	_handleFacesDetected = (faceData, cam) => {
		if (faceData.faces.length < 1) {
			return
		}
		cam.takePictureAsync({
			quality: 0.1,
			base64: true,
			exif: false
		}).then(photo => {
			this._updateFaceData(faceData, photo)
		})
	}

	_switchCamera = () => {
		switch (this.state.activeCamera) {
			case Camera.Constants.Type.back:
				this.props.store.dispatch(setActiveCamera(null))
				break;
			case Camera.Constants.Type.front:
				this.props.store.dispatch(setActiveCamera(Camera.Constants.Type.back))
				break;
			default:
				this.props.store.dispatch(setActiveCamera(Camera.Constants.Type.front))
				break;
		}
	}

	_updateFaceData = (newFaceData, photo) => {
		this.props.store.dispatch(setFacesDetected({
			...newFaceData,
			photo
		}))
	}
}

export { CameraRenderer }