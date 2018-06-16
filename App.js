import React from 'react'
import { Text, View, Button } from 'react-native'
import { PermissionDisplay } from './PermissionDisplay'
import { LocationDisplay } from './LocationDisplay'

import { styles } from './styles'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			locationPermissions: null
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<PermissionDisplay onPermissionUpdate={this._handlePermissionUpdate} />
				<LocationDisplay permissions={this.state.locationPermissions} />
			</View>
		)
	}

	_handlePermissionUpdate = newPermissions => {
		console.log(`[App] Got new permissions: ${JSON.stringify(newPermissions, null, 4)}`)
		this.setState({ locationPermissions: newPermissions.permissionLocation })
	}
}

export default App
export { App }