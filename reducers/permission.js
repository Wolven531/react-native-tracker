import * as ActionTypes from '../constants/action-types'

const payloadRequiredActions = [
	ActionTypes.SET_PERMISSIONS_CAMERA,
	ActionTypes.SET_PERMISSIONS_LOCATION
]

const initialState = {
	permissionCamera: null,
	permissionLocation: null
}

const permissionReducer = (state = initialState, action) => {
	const { payload, type } = action

	console.info(`[reducer] Processing action of type="${type}"`)
	if (!payload && payloadRequiredActions.indexOf(type) > -1) {
		console.warn(`[reducer] Payload was missing for type=${type}`)
		return state
	}

	switch (type) {
		case ActionTypes.SET_PERMISSIONS_CAMERA:
			return {
				...state,
				permissionCamera: payload.permissions
			}
		case ActionTypes.SET_PERMISSIONS_LOCATION:
			return {
				...state,
				permissionLocation: payload.permissions
			}
		default:
		return state
	}
}

export { permissionReducer }
