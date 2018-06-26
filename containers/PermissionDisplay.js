import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Permissions } from 'expo'

import { CameraStatusDisplay } from '../components/CameraStatusDisplay'
import { PermissionObjectDisplay } from '../components/PermissionObjectDisplay'
import { wrapWithMarginBottom } from '../utils'

import {
	setPermissionsCamera,
	setPermissionsLocation
} from '../actions'

// import { styles } from './styles'

const localStyles = {
	buttonPermission: {
		backgroundColor: '#0aa',
		borderRadius: 99999
	},
	container: {
		// backgroundColor: '#0f0',
		alignSelf: 'stretch',
		flex: 1,
		justifyContent: 'center',
		paddingBottom: 10
	},
	header: {
		color: '#eee',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 20
		// lineHeight: 16.5
	}
}

class PermissionDisplay extends React.Component {
	constructor(props) {
		super(props)
		this.state = props.store.getState()
		props.store.subscribe(() => {
			this.setState({
				activeCamera: props.store.getState().activeCamera,
				permissionsCamera: props.store.getState().permissionsCamera,
				permissionsLocation: props.store.getState().permissionsLocation
			})
		})
	}
	
	componentDidMount() {
		setTimeout(this._loadPermissionsAsync, 0)
	}

	render() {
		return (
			<View style={localStyles.container}>
				{this._renderOverview()}
				<Button
					buttonStyle={localStyles.buttonPermission}
					title="Prompt for permissions"
					onPress={async () => await this._askPermissionsAsync()} />
			</View>
		)
	}

	_askPermissionsAsync = async () => {
		const permissionsCamera = await Permissions.askAsync(Permissions.CAMERA)
		const permissionsLocation = await Permissions.askAsync(Permissions.LOCATION)

		this.props.store.dispatch(setPermissionsLocation(permissionsLocation))
		this.props.store.dispatch(setPermissionsCamera(permissionsCamera))
	}

	_loadPermissionsAsync = async () => {
		const permissionsLocation = await Permissions.getAsync(Permissions.LOCATION)
		const permissionsCamera = await Permissions.getAsync(Permissions.CAMERA)

		this.props.store.dispatch(setPermissionsLocation(permissionsLocation))
		this.props.store.dispatch(setPermissionsCamera(permissionsCamera))
	}

	_renderOverview = () => wrapWithMarginBottom(
		<React.Fragment>
			<View style={{
				backgroundColor: '#0a0',
				flex: 1,
				maxHeight: 45
			}}>
				<Text style={localStyles.header}>Permissions</Text>
			</View>
			<PermissionObjectDisplay permission={this.state.permissionsCamera} title={"Camera"} />
			<PermissionObjectDisplay permission={this.state.permissionsLocation} title={"Location"} />
			<CameraStatusDisplay activeCamera={this.state.activeCamera} />
		</React.Fragment>
	)
}

export { PermissionDisplay }
