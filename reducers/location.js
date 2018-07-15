import * as ActionTypes from '../constants/action-types'

const payloadRequiredActions = [
	ActionTypes.SET_LOCATION_UPDATING,
	ActionTypes.SET_NEW_LOCATION
]

const initialState = {
	locationIsUpdating: false,
	locationResult: null,
	mapRegion: null
}

const locationReducer = (state = initialState, action) => {
	const { payload, type } = action

	console.info(`[locationReducer] Processing action of type="${type}"`)
	if (!payload && payloadRequiredActions.indexOf(type) > -1) {
		console.warn(`[locationReducer] Payload was missing for type=${type}`)
		return state
	}

	switch (type) {
		case ActionTypes.SET_LOCATION_UPDATING:
		return {
			...state,
			locationIsUpdating: payload.isUpdating
		}
		case ActionTypes.SET_NEW_LOCATION:
		return {
			...state,
			locationIsUpdating: false,
			locationResult: payload.newLocation,
			mapRegion: {
				latitude: payload.newLocation.coords.latitude,
				latitudeDelta: 0.0922,
				longitude: payload.newLocation.coords.longitude,
				longitudeDelta: 0.0421
			}
		}
		case ActionTypes.SET_MAP_REGION:
		return {
			...state,
			mapRegion: payload.newRegion
		}
		default:
		return state
	}
}

export { locationReducer }
