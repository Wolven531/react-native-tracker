import 'core-js'
import React from 'react'
import { Text, View } from 'react-native'

import { store } from './store'
import { setPermissionsLocation } from './actions'

import { PermissionDisplay } from './PermissionDisplay'
import { LocationDisplay } from './LocationDisplay'

import { styles } from './styles'

class App extends React.Component {
	constructor(props) {
		super(props)
		console.log(`[App][constructor]`)
		this.state = store.getState()
		//store.subscribe(this.render)// TODO: replace with `react-redux`?
		store.subscribe(() => {
			console.log(`[App][storeSubscribeFire] calling render...`)
			this.render()
		})
	}

	render() {
		console.log(`[App][render]`)
		return (
			<View style={styles.container}>
				{/*
				<Text>asdf</Text>
				<LocationDisplay permissions={this.state.permissionsLocation} />
				*/}
				<PermissionDisplay store={store} />
			</View>
		)
	}

	// _dispatchPermissionsUpdate = newPermissions => {
	// 	console.info(`[App] Got new permissions: ${JSON.stringify(newPermissions, null, 4)}`)
	// 	store.dispatch(setPermissionsLocation(newPermissions.permissionLocation))
	// }
}

export default App
export { App }