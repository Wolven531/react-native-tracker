import React from 'react'
// import { Image, Text, TouchableOpacity } from 'react-native'
import {  View } from 'react-native'
import { Button } from 'react-native-elements'
import { Camera } from 'expo'
import PropTypes from 'prop-types'

// import { BASE_64_PREFIX } from '../constants/strings'

import { ZoomControl } from '../containers/ZoomControl'

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
const renderFaceHighlight = face => {
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
			{/*
			{CameraRenderer.renderLandmark(face.leftEyePosition, origin)}
			{CameraRenderer.renderLandmark(face.rightEyePosition, origin)}
			*/}
			{/*
			<Image
				source={{ uri: `${BASE_64_PREFIX}${this.state.detectedFaces.photo.base64}` }}
				style={{ height: 50, width: 50 }} />
			*/}
		</View>
	)
}

const CameraRenderer = ({ activeCamera,
							cameraZoom,
							detectedFaces,
							onSwitchCameraClick,
							updateFaceData }) => {
	this.camera = null

	const _handleBarCodeRead = barCodeData => {
		// console.log(`Got barcode in camera=${JSON.stringify(barCodeData, null, 4)}`)
	}
	const _handleFacesDetected = faceData => {
		if (faceData.faces.length < 1) {
			return
		}
		this.camera.takePictureAsync({
				base64: true,
				exif: false,
				quality: cameraQuality
			})
			.then(photo => {
				updateFaceData(faceData, photo)
			})
			.catch(err => {
				// console.info(`Error taking picture = ${JSON.stringify(err, null, 4)}`)
			})
	}
	const _setCameraReference = cameraReference => this.camera = cameraReference

	// TODO: fix when facesDetected gets fired one time after switch active camera
	// and thus the face highlight shows up after camera switches
	// console.log(`faces is null ? ${detectedFaces === null}`)

	return (
		<View style={localStyles.container}>
			<View style={localStyles.blankBackground}>
				{activeCamera &&
					<Camera ref={_setCameraReference}
						style={localStyles.camera}
						type={activeCamera}
						zoom={cameraZoom}
						faceDetectionClassifications={Camera.Constants.FaceDetection.Classifications.all}
						faceDetectionLandmarks={Camera.Constants.FaceDetection.Landmarks.all}
						faceDetectionMode={Camera.Constants.FaceDetection.Mode.accurate}// or .fast
						onBarCodeRead={_handleBarCodeRead}
						onFacesDetected={_handleFacesDetected}>
							{detectedFaces &&
								<View style={{
									// backgroundColor: 'rgba(0, 255, 0, .5)',
									flex: 1
									// position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
								}}>
									{renderFaceHighlight(detectedFaces.faces[0])}
									{/*
									{CameraRenderer.renderLandmark(detectedFaces.faces[0].leftEyePosition, detectedFaces.faces[0].bounds.origin)}
									{CameraRenderer.renderLandmark(detectedFaces.faces[0].rightEyePosition, detectedFaces.faces[0].bounds.origin)}
									*/}
								</View>
							}
							{/*
							<TouchableOpacity style={localStyles.cameraTouchable} onPress={this._takePicture} />
							*/}
					</Camera>
				}
			</View>
			<ZoomControl cameraZoom={cameraZoom} />
			<Button buttonStyle={localStyles.buttonSwitchCamera} title="Switch Camera" onPress={() => onSwitchCameraClick(activeCamera)} />]
		</View>
	)
}

CameraRenderer.propTypes = {
	activeCamera: PropTypes.oneOf([null, Camera.Constants.Type.back, Camera.Constants.Type.front]),
	cameraZoom: PropTypes.number,
	detectedFaces: PropTypes.object,
	onSwitchCameraClick: PropTypes.func.isRequired,
	updateFaceData: PropTypes.func.isRequired
}

export {
	CameraRenderer
}
