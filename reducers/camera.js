import * as ActionTypes from '../constants/action-types'

const payloadRequiredActions = [
	ActionTypes.SET_ACTIVE_CAMERA,
	ActionTypes.SET_CAMERA_ZOOM,
	ActionTypes.SET_CAMERAROLL_PHOTOS,
	ActionTypes.SET_FACES_DETECTED,
	ActionTypes.SET_PHOTO
]

const initialState = {
	activeCamera: null,
	cameraRollPhotos: [],
	cameraZoom: 0,
	detectedFaces: null
}

const cameraReducer = (state = initialState, action) => {
	const { payload, type } = action

	console.info(`[reducer] Processing action of type="${type}"`)
	if (!payload && payloadRequiredActions.indexOf(type) > -1) {
		console.warn(`[reducer] Payload was missing for type=${type}`)
		return state
	}

	switch (type) {
		case ActionTypes.SET_ACTIVE_CAMERA:
			return {
				...state,
				activeCamera: payload.camera,
				cameraZoom: 0,
				detectedFaces: null
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

export { cameraReducer }
