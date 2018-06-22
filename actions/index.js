const setPermissionsLocation = (newLocationPermissions) => {
	return {
		type: 'set_permissions_location',
		payload: {
			permissions: newLocationPermissions
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

export {
	setPermissionsCamera,
	setPermissionsLocation
}
