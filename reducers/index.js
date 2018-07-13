import { combineReducers } from 'redux'

import { cameraReducer as camera } from './camera'
import { locationReducer as location } from './location'
import { permissionReducer as permission } from './permission'

const mainReducer = combineReducers({
	camera,
	location,
	permission
})

export { mainReducer }
