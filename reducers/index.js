const mainReducer = (state = { permissionsLocation: null }, action) => {
	const type = action.type
	const payload = action.payload

	console.info(`Processing action of type="${type}"`)

	switch (type) {
		case 'set_permissions_location':
			if (!payload) {
				return state
			}
			const permissionsLocation = payload.permissions
			console.info(`Setting permissions for location="${JSON.stringify(permissionsLocation, null, 4)}"`)
			return {
				...state,
				permissionsLocation
			}
		default:
			return state
	}
}

export { mainReducer }
