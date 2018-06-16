import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Permissions } from 'expo'
import DefaultProps from 'prop-types'

import { styles } from './styles'

class PermissionDisplay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			permissionCamera: props.permissionCamera || null,
			permissionLocation: props.permissionLocation || null
		}
	}

	componentDidMount() {
		setTimeout(this._loadPermissionsAsync, 0)
	}

	render() {
		return (
			<View styles={styles.permissionsDisplay}>
				<Text style={styles.permissionsHeader}>Permissions</Text>
				{/*
				<Text>Camera: {this.state.permissionCamera ? JSON.stringify(this.state.permissionCamera, null, 4) : 'not requested'}</Text>
				<Text>Location: {this.state.permissionLocation ? JSON.stringify(this.state.permissionLocation, null, 4) : 'not requested'}</Text>
				*/}
				<View style={styles.permissionsList}>
					<Text style={styles.textWhite}>Camera:&nbsp;
						{!this.state.permissionCamera &&
							<Text style={styles.textWhite}>Unknown</Text>}
						{this.state.permissionCamera &&
							<Text style={this._getPermissionStyle(this.state.permissionCamera)}>
								{this._capitalize(this.state.permissionCamera.status)}
							</Text>}
					</Text>
					<Text style={styles.textWhite}>Location:&nbsp;
						{!this.state.permissionLocation &&
							<Text style={styles.textWhite}>Unknown</Text>}
						{this.state.permissionLocation &&
							<Text style={this._getPermissionStyle(this.state.permissionLocation)}>
								{this._capitalize(this.state.permissionLocation.status)}
							</Text>}
					</Text>
				</View>
				<Button
					title="Prompt for permissions"
					buttonStyle={styles.buttonPermission}
					onPress={async () => await this._askPermissionsAsync()} />
			</View>
		)
	}

	_askPermissionsAsync = async () => {
		const permissionsResponseCamera = await Permissions.askAsync(Permissions.CAMERA)
		const permissionsResponseLocation = await Permissions.askAsync(Permissions.LOCATION)
		this.setState({
			permissionCamera: permissionsResponseCamera,
			permissionLocation: permissionsResponseLocation
		})
		if (this.props.onPermissionUpdate) {
			this.props.onPermissionUpdate(this.state)
		}
	}

	_capitalize = (str) => {
		if(!str) {
			return ''
		}
		return `${str[0].toUpperCase()}${str.slice(1)}`
	}

	_getPermissionStyle = (permissionObj) => {
		if (!permissionObj) {
			return styles.textWhite
		}
		if (permissionObj.status === 'granted') {
			return styles.textGreen
		}
		if (permissionObj.status === 'denied') {
			return styles.textRed
		}
		return styles.textWhite
	}

	_loadPermissionsAsync = async () => {
		const permissionsResponseLocation = await Permissions.getAsync(Permissions.LOCATION)
		const permissionsResponseCamera = await Permissions.getAsync(Permissions.CAMERA)
		this.setState({
			permissionCamera: permissionsResponseCamera,
			permissionLocation: permissionsResponseLocation
		})
		if (this.props.onPermissionUpdate) {
			this.props.onPermissionUpdate(this.state)
		}
	}
}

PermissionDisplay.propTypes = {
	onPermissionUpdate: DefaultProps.func,
	permissionCamera: DefaultProps.shape({
		status: DefaultProps.string.isRequired
	}),
	permissionLocation: DefaultProps.shape({
		status: DefaultProps.string.isRequired
	})
}

export { PermissionDisplay }
