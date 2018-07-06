import * as ActionTypes from '../constants/action-types'

const payloadRequiredActions = [
	ActionTypes.SET_ACTIVE_CAMERA,
	ActionTypes.SET_CAMERA_ZOOM,
	ActionTypes.SET_CAMERAROLL_PHOTOS,
	ActionTypes.SET_FACES_DETECTED,
	ActionTypes.SET_PERMISSIONS_CAMERA,
	ActionTypes.SET_PERMISSIONS_LOCATION,
	ActionTypes.SET_PHOTO
]

const initialCameraState = {
	activeCamera: null,
	cameraRollPhotos: [],
	cameraZoom: 0.1,
	detectedFaces: null
}

const cameraReducer = (state = initialCameraState, action) => {
	const { payload, type } = action
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
		case ActionTypes.SET_CAMERAROLL_PHOTOS:
			return {
				...state,
				cameraRollPhotos: payload.photos
			}
		case ActionTypes.SET_FACES_DETECTED:
			return {
				...state,
				detectedFaces: payload.faceData
			}
		default:
		return state
	}
}

const initialPermissionState = {
	permissionCamera: null,
	permissionLocation: null
}

const permissionReducer = (state = initialPermissionState, action) => {
	const { payload, type } = action
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

const initialState = {
	camera: initialCameraState,
	permission: initialPermissionState
	// photo: null,
}

const mainReducer = (state = initialState, action) => {
	const { payload, type } = action.type

	console.info(`[reducer] Processing action of type="${type}"`)
	if (!payload && payloadRequiredActions.indexOf(type) > -1) {
		console.warn(`[reducer] Payload was missing for type=${type}`)
		return state
	}

	switch (type) {
		case ActionTypes.SET_ACTIVE_CAMERA:
			return {
				...state,
				camera: cameraReducer(state.camera, action)
			}
		case ActionTypes.SET_CAMERA_ZOOM:
			return {
				...state,
				camera: cameraReducer(state.camera, action)
			}
		case ActionTypes.SET_CAMERAROLL_PHOTOS:
			return {
				...state,
				camera: cameraReducer(state.camera, action)
			}
		case ActionTypes.SET_FACES_DETECTED:
			return {
				...state,
				camera: cameraReducer(state.camera, action)
			}
		case ActionTypes.SET_PERMISSIONS_CAMERA:
			return {
				...state,
				permission: permissionReducer(state.permission, action)
			}
		case ActionTypes.SET_PERMISSIONS_LOCATION:
			return {
				...state,
				permission: permissionReducer(state.permission, action)
			}
		// case ActionTypes.SET_PHOTO:
		// 	return {
		// 		...state,
		// 		photo: payload.photoUri
		// 	}
		default:
			return state
	}
}

export { mainReducer }
