import * as ActionTypes from '../constants/action-types'

const initialState = {
	activeCamera: null,
	permissionsCamera: null,
	permissionsLocation: null,
	photo: null,
	cameraZoom: 0
}

const payloadRequiredActions = [
	ActionTypes.SET_ACTIVE_CAMERA,
	ActionTypes.SET_CAMERA_ZOOM,
	ActionTypes.SET_PERMISSIONS_CAMERA,
	ActionTypes.SET_PERMISSIONS_LOCATION,
	ActionTypes.SET_PHOTO
]

const mainReducer = (state = initialState, action) => {
	const type = action.type
	const payload = action.payload

	console.info(`[reducer] Processing action of type="${type}"`)
	if (!payload && payloadRequiredActions.indexOf(type) > -1) {
		console.warn(`[reducer] Payload was missing for type=${type}`)
		return state
	}

	switch (type) {
		case ActionTypes.SET_ACTIVE_CAMERA:
			return {
				...state,
				activeCamera: payload.camera
			}
		case ActionTypes.SET_CAMERA_ZOOM:
			return {
				...state,
				cameraZoom: payload.zoom
			}
		case ActionTypes.SET_PERMISSIONS_CAMERA:
			return {
				...state,
				permissionsCamera: payload.permissions
			}
		case ActionTypes.SET_PERMISSIONS_LOCATION:
			return {
				...state,
				permissionsLocation: payload.permissions
			}
		case ActionTypes.SET_PHOTO:
			return {
				...state,
				photo: payload.photoUri
			}
		default:
			return state
	}
}

export { mainReducer }
