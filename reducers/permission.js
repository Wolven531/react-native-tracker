import * as ActionTypes from '../constants/action-types'

const payloadRequiredActions = [
	ActionTypes.SET_PERMISSION_CAMERA,
	ActionTypes.SET_PERMISSION_LOCATION
]

const initialState = {
	permissionCamera: null,
	permissionLocation: null
}

const permissionReducer = (state = initialState, action) => {
	const { payload, type } = action

	console.info(`[permissionReducer] Processing action of type="${type}"`)
	if (!payload && payloadRequiredActions.indexOf(type) > -1) {
		console.warn(`[permissionReducer] Payload was missing for type=${type}`)
		return state
	}

	switch (type) {
		case ActionTypes.SET_PERMISSION_CAMERA:
			return {
				...state,
				permissionCamera: payload.permission
			}
		case ActionTypes.SET_PERMISSION_LOCATION:
			return {
				...state,
				permissionLocation: payload.permission
			}
		default:
		return state
	}
}

export { permissionReducer }
