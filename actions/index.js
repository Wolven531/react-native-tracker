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

const setCameraRollPhotos = (photos) => {
	return {
		type: ActionTypes.SET_CAMERAROLL_PHOTOS,
		payload: {
			photos
		}
	}
}

const setFacesDetected = (faceData) => {
	return {
		type: ActionTypes.SET_FACES_DETECTED,
		payload: {
			faceData
		}
	}
}

const setMapRegion = (newRegion) => {
	return {
		type: ActionTypes.SET_MAP_REGION,
		payload: {
			newRegion
		}
	}
}

const setNewLocation = (newLocation) => {
	return {
		type: ActionTypes.SET_NEW_LOCATION,
		payload: {
			newLocation
		}
	}
}

const setPermissionCamera = (newCameraPermission) => {
	return {
		type: ActionTypes.SET_PERMISSION_CAMERA,
		payload: {
			permission: newCameraPermission
		}
	}
}

const setPermissionLocation = (newLocationPermission) => {
	return {
		type: ActionTypes.SET_PERMISSION_LOCATION,
		payload: {
			permission: newLocationPermission
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

const setUpdatingLocation = (isUpdating) => {
	return {
		type: ActionTypes.SET_NEW_LOCATION,
		payload: {
			isUpdating
		}
	}
}

export {
	setActiveCamera,
	setCameraZoom,
	setCameraRollPhotos,
	setFacesDetected,
	setMapRegion,
	setNewLocation,
	setPermissionCamera,
	setPermissionLocation,
	setPhoto,
	setUpdatingLocation
}
