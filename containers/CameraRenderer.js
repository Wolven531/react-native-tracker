import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Button, Slider } from 'react-native-elements'
import { Camera } from 'expo'

import {
	setActiveCamera,
	setCameraZoom,
	setFacesDetected,
	setPhoto
} from '../actions'

// import { wrapWithMarginBottom } from '../utils'

import { styles } from '../styles'

const localStyles = {
	buttonSwitchCamera: {
		// borderRadius: styles.defaultButton.borderRadius,
		backgroundColor: '#fa0',
		borderRadius: 99999
	},
	camera: {
		alignItems: 'flex-end',
		alignSelf: 'stretch',
		flex: 1,
		justifyContent: 'space-between',
		// flexDirection: 'row',
		// height: '90%',
		marginBottom: 10,
		minHeight: 350,
		// minWidth: 600,
		// width: '100%',
	},
	cameraTouchable: {
		alignSelf: 'flex-end',
		backgroundColor: 'rgba(200,200,200,.65)',
		// TODO: figure out why js file can use '100%',
		// but this file must use number
		borderRadius: 99999,
		flex: 1,
		// justifyContent: 'space-between',
		margin: 20,
		// marginVertical: 10,
		maxHeight: 80,
		width: 80,
	},
	container: {
		// backgroundColor: '#f0f',
		alignSelf: 'stretch',
		alignItems: 'stretch',
		flex: 1,
		padding: 10,
		// paddingLeft: 20,
		// paddingRight: 20
	},
	containerActive: {
		// backgroundColor: '#f0f',
		alignSelf: 'stretch',
		alignItems: 'stretch',
		flex: 1,
		padding: 10
		// paddingBottom: 10,
		// paddingLeft: 20,
		// paddingRight: 20
	}
}

const takePicture = (cam, targetStore) => {
	cam.takePictureAsync({
		quality: 0.1,
		base64: true,
		exif: false
	}).then(photo => {
		// console.log(`[PermissionDisplay] Got a picture=${JSON.stringify(photo, null, 4)}`)
		targetStore.dispatch(setPhoto(photo))
	})
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
		// console.log(`state = ${JSON.stringify(this.state, null, 4)}`)
		return (
			<View style={this.state.activeCamera ? localStyles.containerActive : localStyles.container}>
				{this.state.activeCamera ?
					<React.Fragment>
						<Camera
							style={localStyles.camera}
							type={this.state.activeCamera}
							ref={cam => this.camera = cam}
							zoom={this.state.cameraZoom}
							faceDetectionClassifications={Camera.Constants.FaceDetection.Classifications.all}
							faceDetectionMode={Camera.Constants.FaceDetection.Mode.accurate}// or .fast
							// onBarCodeRead={barCodeData => {
							// 	console.log(`Got barcode in camera=${JSON.stringify(barCodeData, null, 4)}`)
							// }}
							onFacesDetected={faceData => {
								if (faceData.faces.length < 1) {
									// 	console.log(`${JSON.stringify(faceData.faces, null, 4)}`)
									return
								}
								if (!this.state.detectedFaces) {
									this._updateFaceData(faceData)
								}
								// console.log(`Got faces in camera=${JSON.stringify(faceData.faces, null, 4)}`)
								// console.log(`smile chances = ${faceData.faces.map(face => {
								// 	const formatted = (face.smilingProbability * 100).toFixed(2)
								// 	if (face.smilingProbability > .7) {
								// 		return `Happy=${formatted}`
								// 	}
								// 	if (face.smilingProbability > .4) {
								// 		return `Meh=${formatted}`
								// 	}
								// 	return `Sad=${formatted}`
								// }
								// ).join(',')}`)
							}}>
							<TouchableOpacity
								style={localStyles.cameraTouchable}
								onPress={() => { takePicture(this.camera, this.props.store) }}/>
						</Camera>
						<Text style={styles.textWhite}>
							Zoom: {((this.state.cameraZoom + 1.0) * 100.0).toFixed(2)}%
						</Text>
						<Text style={styles.textWhite}>
							Face Data: {JSON.stringify(this.state.detectedFaces, null, 4)}
						</Text>
						<Slider
							animateTransitions={true}
							animationType={'spring'}
							// maximumValue={200}
							maximumValue={110}
							minimumValue={100}
							onValueChange={newValue => {
								const actualZoom = (newValue - 100.0) / 100.0
								this.props.store.dispatch(setCameraZoom(actualZoom))
							}}
							step={0.05}
							// style={{}}
							// thumbStyle={{}}
							// thumbTouchSize={{
							// 	height: 100,
							// 	width: 100
							// }}
							// trackStyle={{}}
							value={(this.state.cameraZoom + 1.0) * 100.0}
							/>
					</React.Fragment>
					:
					null
				}
				<Button
					buttonStyle={localStyles.buttonSwitchCamera}
					title="Switch Camera"
					onPress={this._switchCamera} />
			</View>
		)
	}

	_switchCamera = () => {
		switch(this.state.activeCamera) {
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

	_updateFaceData = (newFaceData) => {
		this.props.store.dispatch(setFacesDetected(newFaceData))
	}
}

export { CameraRenderer }