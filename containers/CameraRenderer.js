import React from 'react'
import { connect } from 'react-redux'
import { Camera } from 'expo'

import {
	setActiveCamera,
	setFacesDetected
} from '../actions'

import { CameraRenderer as StatelessCameraRenderer } from '../components/CameraRenderer'

const mapStateToProps = (state, ownProps) => {
	const { navigation } = ownProps
	const { activeCamera, cameraZoom, detectedFaces } = state.camera
	const paramActiveCamera = navigation.getParam('activeCamera', activeCamera)
	// const wereParamsSupplied = ownProps.navigation.state.params !== null

	return {
		activeCamera: paramActiveCamera,
		cameraZoom,
		detectedFaces
	}
}

const mapDispatchToProps = dispatch => {
	// const onSwitchCameraClick = activeCamera => {
	// 	console.log(`[onSwitchCameraClick] activeCamera = ${activeCamera}`)
	// 	switch (activeCamera) {
	// 		case Camera.Constants.Type.back:
	// 			dispatch(setActiveCamera(null))
	// 		break;
	// 		case Camera.Constants.Type.front:
	// 			dispatch(setActiveCamera(Camera.Constants.Type.back))
	// 		break;
	// 		default:
	// 			dispatch(setActiveCamera(Camera.Constants.Type.front))
	// 		break;
	// 	}
	// }
	const updateFaceData = (newFaceData, photo) => {
		dispatch(setFacesDetected({
			...newFaceData,
			photo
		}))
	}
	return {
		// onSwitchCameraClick,
		updateFaceData
	}
}

const CameraRenderer = connect(mapStateToProps, mapDispatchToProps)(StatelessCameraRenderer)

export {
	CameraRenderer
}
