import 'core-js'
import React from 'react'
// import { ImageBackground, View } from 'react-native'
import { View } from 'react-native'

import { CameraRenderer } from './containers/CameraRenderer'
import { PermissionDisplay } from './containers/PermissionDisplay'
import { LocationRenderer } from './containers/LocationRenderer'

import { store } from './store'

import { styles } from './styles'

const localStyles = {
	container: {
		backgroundColor: 'rgba(0,0,200,.8)',
		flex: 1,
		// flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		justifyContent: 'center',
		overflow: 'scroll'
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = store.getState()
		// store.subscribe(() => {
		// 	// TODO: replace with `react-redux`?
		// 	this.render()// if state is needed, use setState instead
		// })
	}

	render() {
		// console.log(`[App][render]`)
		return (
			<View style={localStyles.container}>
				<PermissionDisplay store={store} />
				<CameraRenderer store={store} />
				{/*
				{this.state.photo && <ImageBackground
					style={{ flex: 1, minHeight: 200 }}
					source={{ uri: this.state.photo }} />}
				*/}
				{/* <LocationRenderer store={store} /> */}
			</View>
		)
	}
}

export { App }
export default App
