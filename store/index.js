import { combineReducers, createStore } from 'redux'

import { mainReducer } from '../reducers'

// TODO: when multiple reducers come into play
// const allReducers = combineReducers({
// 	...mainReducer
// })

const store = createStore(mainReducer)

export { store }
