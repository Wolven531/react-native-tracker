import React from 'react'
import { connect } from 'react-redux'

import { setFacesDetected } from '../actions'
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
	return {
		updateFaceData: (newFaceData, photo) => {
			dispatch(setFacesDetected({
				...newFaceData,
				photo
			}))
		}
	}
}

const CameraRenderer = connect(mapStateToProps, mapDispatchToProps)(StatelessCameraRenderer)

export { CameraRenderer }
