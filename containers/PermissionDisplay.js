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
		alignSelf: 'stretch',
		flex: 1,
		justifyContent: 'center'
	},
	header: {
		alignSelf: 'stretch',
		backgroundColor: '#0a0',
		color: '#eee',
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		paddingBottom: '1%',
		paddingTop: '3%',
		textAlign: 'center'
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
			<View styles={localStyles.container}>
				{this._renderOverview()}
				{wrapWithMarginBottom(
					<Button
						buttonStyle={localStyles.buttonPermission}
						title="Prompt for permissions"
						onPress={async () => await this._askPermissionsAsync()} />
				)}
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
			{wrapWithMarginBottom(
				<Text style={localStyles.header}>Permissions</Text>
			)}
			<PermissionObjectDisplay permission={this.state.permissionsCamera} title={"Camera"} />
			<PermissionObjectDisplay permission={this.state.permissionsLocation} title={"Location"} />
			<CameraStatusDisplay activeCamera={this.state.activeCamera} />
		</React.Fragment>
	)
}

export { PermissionDisplay }
