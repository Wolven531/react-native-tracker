import { combineReducers } from 'redux'

import { cameraReducer } from './camera'
import { permissionReducer } from './permission'

const mainReducer = combineReducers({
	camera: cameraReducer,
	permission: permissionReducer
})

export { mainReducer }
