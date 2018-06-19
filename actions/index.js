const setPermissionsLocation = (newLocationPermissions) => {
	return {
		type: 'set_permissions_location',
		permissionsLocation: newLocationPermissions
	}
}

export { setPermissionsLocation }
