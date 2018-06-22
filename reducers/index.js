const mainReducer = (state = { permissionsCamera: null , permissionsLocation: null }, action) => {
	const type = action.type
	const payload = action.payload

	console.info(`[reducer] Processing action of type="${type}"`)
	let returnData = null
	switch (type) {
		case 'set_permissions_camera':
			if (!payload) {
				console.warn(`[reducer] payload was missing`)
				return state
			}
			const permissionsCamera = payload.permissions
			returnData = {
				...state,
				permissionsCamera
			}
			// console.info(`[reducer] Setting permissions for canmera="${JSON.stringify(permissionsCamera, null, 4)}"`)
			// console.log(`[reducer] returnData=${JSON.stringify(returnData, null, 4)}`)

			return returnData
		case 'set_permissions_location':
			if (!payload) {
				console.warn(`[reducer] payload was missing`)
				return state
			}
			const permissionsLocation = payload.permissions
			returnData = {
				...state,
				permissionsLocation
			}
			// console.info(`[reducer] Setting permissions for location="${JSON.stringify(permissionsLocation, null, 4)}"`)
			// console.log(`[reducer] returnData=${JSON.stringify(returnData, null, 4)}`)
			return returnData
		default:
			return state
	}
}

export { mainReducer }
