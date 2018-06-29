import * as ActionTypes from '../constants/action-types'

const setActiveCamera = (cameraType) => {
	return {
		type: ActionTypes.SET_ACTIVE_CAMERA,
		payload: {
			camera: cameraType
		}
	}
}

const setCameraZoom = (newZoom) => {
	return {
		type: ActionTypes.SET_CAMERA_ZOOM,
		payload: {
			zoom: newZoom
		}
	}
}

const setPermissionsCamera = (newCameraPermissions) => {
	return {
		type: ActionTypes.SET_PERMISSIONS_CAMERA,
		payload: {
			permissions: newCameraPermissions
		}
	}
}

const setPermissionsLocation = (newLocationPermissions) => {
	return {
		type: ActionTypes.SET_PERMISSIONS_LOCATION,
		payload: {
			permissions: newLocationPermissions
		}
	}
}

const setPhoto = (newPhoto) => {
	return {
		type: ActionTypes.SET_PHOTO,
		payload: {
			photoUri: newPhoto.uri
		}
	}
}

export {
	setActiveCamera,
	setCameraZoom,
	setPermissionsCamera,
	setPermissionsLocation,
	setPhoto
}
