const setActiveCamera = (cameraType) => {
	return {
		type: 'set_active_camera',
		payload: {
			camera: cameraType
		}
	}
}

const setPermissionsCamera = (newCameraPermissions) => {
	return {
		type: 'set_permissions_camera',
		payload: {
			permissions: newCameraPermissions
		}
	}
}

const setPermissionsLocation = (newLocationPermissions) => {
	return {
		type: 'set_permissions_location',
		payload: {
			permissions: newLocationPermissions
		}
	}
}

const setPhoto = (newPhoto) => {
	return {
		type: 'set_photo',
		payload: {
			photoUri: newPhoto.uri
		}
	}
}

export {
	setActiveCamera,
	setPermissionsCamera,
	setPermissionsLocation,
	setPhoto
}
