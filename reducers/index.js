const initialState = {
	activeCamera: null,
	permissionsCamera: null,
	permissionsLocation: null,
	photo: null
}

const mainReducer = (state = initialState, action) => {
	const type = action.type
	const payload = action.payload

	console.info(`[reducer] Processing action of type="${type}"`)

	switch (type) {
		case 'set_active_camera':
			if (!payload) {
				console.warn(`[reducer] payload was missing`)
				return state
			}
			return {
				...state,
				activeCamera: payload.camera
			}
		case 'set_photo':
			if (!payload) {
				console.warn(`[reducer] payload was missing`)
				return state
			}
			return {
				...state,
				photo: payload.photoUri
			}
		case 'set_permissions_camera':
			if (!payload) {
				console.warn(`[reducer] payload was missing`)
				return state
			}
			return {
				...state,
				permissionsCamera: payload.permissions
			}
		case 'set_permissions_location':
			if (!payload) {
				console.warn(`[reducer] payload was missing`)
				return state
			}
			return {
				...state,
				permissionsLocation: payload.permissions
			}
		default:
			return state
	}
}

export { mainReducer }
