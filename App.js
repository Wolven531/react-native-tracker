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
		this.state = store.getState()
		store.subscribe(this.render)// TODO: replace with `react-redux`?
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>asdf</Text>
				<PermissionDisplay onPermissionUpdate={this._dispatchPermissionsUpdate} />
				<LocationDisplay permissions={store.getState().permissionsLocation} />
			</View>
		)
	}

	_dispatchPermissionsUpdate = newPermissions => {
		console.info(`[App] Got new permissions: ${JSON.stringify(newPermissions, null, 4)}`)
		store.dispatch(setPermissionsLocation(newPermissions.permissionLocation))
	}
}

export default App
export { App }