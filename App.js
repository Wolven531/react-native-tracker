import 'core-js'
import React from 'react'
// import { ImageBackground, View } from 'react-native'
import { ScrollView, View } from 'react-native'

import { CameraRenderer } from './containers/CameraRenderer'
import { PermissionDisplay } from './containers/PermissionDisplay'
import { LocationRenderer } from './containers/LocationRenderer'

import { store } from './store'

import { styles } from './styles'

const localStyles = {
	container: {
		backgroundColor: '#0000c8',
		flex: 1,
		// flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		justifyContent: 'center',
		// minHeight: '100%',
		minWidth: '100%',
		position: 'absolute',
		top: 0
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
			<ScrollView
				style={{
					backgroundColor: '#0000c8'
				}}
				contentContainerStyle={localStyles.container}>
				<PermissionDisplay store={store} />
				<CameraRenderer store={store} />
				{/*
				{this.state.photo && <ImageBackground
					style={{ flex: 1, minHeight: 200 }}
					source={{ uri: this.state.photo }} />}
				*/}
				{/* <LocationRenderer store={store} /> */}
			</ScrollView>
		)
	}
}

export { App }
export default App
