import { combineReducers } from 'redux'

import { cameraReducer as camera } from './camera'
import { permissionReducer as permission } from './permission'

const mainReducer = combineReducers({
	camera,
	permission
})

export { mainReducer }
