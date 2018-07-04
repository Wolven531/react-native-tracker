import React from 'react'
// NOTE: Regarding rendering images in react native:
// Image is for simple image display
// ImageBackground is for nesting things inside the image
// import { Image, Text, TouchableOpacity } from 'react-native'
import { CameraRoll, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Camera } from 'expo'

import {
	setActiveCamera,
	setFacesDetected,
	setPhoto
} from '../actions'
// import { BASE_64_PREFIX } from '../constants/strings'

import { ZoomControl } from './ZoomControl'

import { styles } from '../styles'

const cameraQuality = 0.1
const landmarkSize = 5
const localStyles = {
	blankBackground: {
		backgroundColor: '#444',
		flex: 1,
		margin: 10
	},
	buttonSwitchCamera: {
		backgroundColor: '#fa0',
		borderRadius: 99999,
		// marginHorizontal: 0
	},
	camera: {
		flex: 1,
		overflow: 'hidden'
	},
	container: {
		alignItems: 'stretch',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		paddingBottom: 10
	},
	// cameraTouchable: {
	// 	alignSelf: 'flex-end',
	// 	backgroundColor: 'rgba(200,200,200,.65)',
	// 	// TODO: figure out why js file can use '100%', but this file must use number
	// 	borderRadius: 99999,
	// 	flex: 1,
	// 	margin: 20,
	// 	maxHeight: 80,
	// 	width: 80
	// },
	face: {
		backgroundColor: 'rgba(0, 0, 0, 0.55)',
		borderColor: '#fa0',
		borderWidth: 2
	},
	landmark: {
		backgroundColor: '#f00',
		height: landmarkSize,
		position: 'absolute',
		width: landmarkSize
	}
}

class CameraRenderer extends React.Component {
	static renderFaceHighlight = (face) => {
		const { origin, size } = face.bounds
		const { height, width } = size
		return (
			<View
				style={[
					localStyles.face,
					{
						// ...face.bounds.size,// NOTE: alternative for width and height
						height,
						// position: 'absolute',
						left: origin.x,
						top: origin.y,
						width
					}
				]}
				// transform={[
				// 	{ perspective: 1000 },
				// 	{ rotateY: `${face.yawAngle.toFixed(0)}deg` },
				// 	{ rotateZ: `${face.rollAngle.toFixed(0)}deg` },
				// ]}
				>
				{CameraRenderer.renderLandmark(face.leftEyePosition, origin)}
				{CameraRenderer.renderLandmark(face.rightEyePosition, origin)}
				{/*
				*/}
				{/*
				<View style={
					{
						backgroundColor: 'rgba(255,0,0,.5)',
						bottom: 0,
						left: 0,
						position: 'absolute',
						right: 0,
						top: 0,
					}
				}>
				</View>
				*/}
				{/*
				<Image
					source={{ uri: `${BASE_64_PREFIX}${this.state.detectedFaces.photo.base64}` }}
					style={{ height: 50, width: 50 }} />
				*/}
			</View>
		)
	}
	
	static renderLandmark = (position, origin) => {
		if (!position) {
			return null
		}
		// const newX = position.x - landmarkSize / 2
		// const newY = position.y - landmarkSize / 2
		const newX = 0
		const newY = 0
		// console.log(`face (x=${origin.x},y=${origin.y}) point ${JSON.stringify(position)} render (x=${newX},y=${newY})`)
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

	camera = null

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
			<View style={localStyles.container}>
				<View style={localStyles.blankBackground}>
					{this.state.activeCamera &&
						<Camera ref={this._setCameraReference}
							style={localStyles.camera}
							type={this.state.activeCamera}
							zoom={this.state.cameraZoom}
							faceDetectionClassifications={Camera.Constants.FaceDetection.Classifications.all}
							faceDetectionLandmarks={Camera.Constants.FaceDetection.Landmarks.all}
							faceDetectionMode={Camera.Constants.FaceDetection.Mode.accurate}// or .fast
							onBarCodeRead={this._handleBarCodeRead}
							onFacesDetected={this._handleFacesDetected}>
								{this.state.detectedFaces &&
									<View style={{
										// backgroundColor: 'rgba(0, 255, 0, .5)',
										flex: 1
										// position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
									}}>
										{CameraRenderer.renderFaceHighlight(this.state.detectedFaces.faces[0])}
										{CameraRenderer.renderLandmark(this.state.detectedFaces.faces[0].leftEyePosition, this.state.detectedFaces.faces[0].bounds.origin)}
										{CameraRenderer.renderLandmark(this.state.detectedFaces.faces[0].rightEyePosition, this.state.detectedFaces.faces[0].bounds.origin)}
									</View>
								}
								{/*
								<TouchableOpacity style={localStyles.cameraTouchable} onPress={this._takePicture} />
								*/}
						</Camera>
					}
				</View>
				<ZoomControl cameraZoom={this.state.cameraZoom} store={this.props.store} />
				<Button buttonStyle={localStyles.buttonSwitchCamera} title="Switch Camera" onPress={this._switchCamera} />]
			</View>
		)
	}

	_handleBarCodeRead = (barCodeData) => {
		// console.log(`Got barcode in camera=${JSON.stringify(barCodeData, null, 4)}`)
	}

	_handleFacesDetected = (faceData) => {
		if (faceData.faces.length < 1) {
			return
		}
		this.camera.takePictureAsync({
				base64: true,
				exif: false,
				quality: cameraQuality
			})
			.then(photo => {
				this._updateFaceData(faceData, photo)
			})
			.catch(err => console.error(`Error taking picture = ${JSON.stringify(err, null, 4)}`))
	}

	_setCameraReference = (cameraReference) => this.camera = cameraReference

	// TODO: fix the error that this will cause if face detection is running during switch
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

	_takePicture = () => {
		// this.camera.takePictureAsync({
		// 		base64: true,
		// 		exif: false,
		// 		quality: cameraQuality
		// 	})
		// 	.then(photo => {
		// 		this.props.store.dispatch(setPhoto(photo))
		// 	})
		// 	.catch(err => console.error(`Error taking picture = ${JSON.stringify(err, null, 4)}`))
	}

	_updateFaceData = (newFaceData, photo) => {
		this.props.store.dispatch(setFacesDetected({
			...newFaceData,
			photo
		}))
	}
}

export { CameraRenderer }