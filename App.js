import 'core-js'
import React from 'react'
// import { ImageBackground, View } from 'react-native'
import { View } from 'react-native'

import { CameraRenderer } from './containers/CameraRenderer'
import { PermissionDisplay } from './containers/PermissionDisplay'
// import { LocationDisplay } from './LocationDisplay'

import { store } from './store'

import { styles } from './styles'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = store.getState()
		store.subscribe(() => {
			// TODO: replace with `react-redux`?
			this.render()// if state is needed, use setState instead
		})
	}

	render() {
		// console.log(`[App][render]`)
		return (
			<View style={styles.container}>
				{/*
				<LocationDisplay permissions={this.state.permissionsLocation} />
				*/}
				<PermissionDisplay store={store} />
				<CameraRenderer store={store} />
				{/*
				{this.state.photo && <ImageBackground
					style={{ flex: 1, minHeight: 200 }}
					source={{ uri: this.state.photo }} />}
				*/}
			</View>
		)
	}
}

export { App }
export default App
