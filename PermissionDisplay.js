import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Permissions } from 'expo'
// import DefaultProps from 'prop-types'

import { setPermissionsCamera, setPermissionsLocation } from './actions'

import { styles } from './styles'

class PermissionDisplay extends React.Component {
	constructor(props) {
		super(props)
		console.log(`[PermissionDisplay][constructor]`)
		//console.log(`[PermissionDisplay][constructor] about to bind this.getPermissionStyle=${JSON.stringify(this.getPermissionStyle, null, 4)}`)
		//this._getPermissionStyle = this._getPermissionStyle.bind(this)
		props.store.subscribe(() => {
			console.log(`[PermissionDisplay][storeSubscribeFire] calling render...`)
			this.render()
		})
	}

	componentDidMount() {
		console.log(`[PermissionDisplay][componentDidMount]`)
		setTimeout(this._loadPermissionsAsync, 0)
	}

	render() {
		console.log(`[PermissionDisplay][render]`)
		const renderState = this.props.store.getState()
		//console.log(`[PermissionDisplay][render] renderState=${JSON.stringify(renderState, null, 4)}`)
		return (
			<View styles={styles.permissionsDisplay}>
				<Text style={styles.permissionsHeader}>Permissions</Text>
				<Text style={styles.textWhite}>
					Camera:&nbsp;
					{renderState.permissionsCamera && renderState.permissionsCamera.status}
					{!renderState.permissionsCamera && 'Unknown'}
				</Text>
				{/*
				<Text>{JSON.stringify(store.getState().permissionsLocation, null, 4)}</Text>
				*/}
				<Text>{JSON.stringify(renderState.permissionsLocation, null, 4)}</Text>
				<Text style={styles.textWhite}>
					Location:&nbsp;
					{renderState.permissionsLocation && renderState.permissionsLocation.status}
					{!renderState.permissionsLocation && 'Unknown'}
				</Text>
				<Button
					buttonStyle={styles.buttonPermission}
					title="Prompt for permissions"
					onPress={async () => await this._askPermissionsAsync()}
					/>
			</View>
		)
	}

	_askPermissionsAsync = async () => {
		console.log(`[PermissionDisplay][_askPermissionsAsync]`)
		const permissionsCamera = await Permissions.askAsync(Permissions.CAMERA)
		const permissionsLocation = await Permissions.askAsync(Permissions.LOCATION)

		this.props.store.dispatch(setPermissionsLocation(permissionsLocation))
		this.props.store.dispatch(setPermissionsCamera(permissionsCamera))
	}

	_loadPermissionsAsync = async () => {
		console.log(`[PermissionDisplay][_loadPermissionsAsync]`)
		const permissionsLocation = await Permissions.getAsync(Permissions.LOCATION)
		const permissionsCamera = await Permissions.getAsync(Permissions.CAMERA)

		this.props.store.dispatch(setPermissionsLocation(permissionsLocation))
		this.props.store.dispatch(setPermissionsCamera(permissionsCamera))
	}
}

// 	getPermissionStyle(permissionObj) {
// 		console.log(`[PermissionDisplay][_getPermissionStyle]`)
// 		// if (!permissionObj) {
// 		// 	return styles.textWhite
// 		// }
// 		// if (permissionObj.status === 'granted') {
// 		// 	return styles.textGreen
// 		// }
// 		// if (permissionObj.status === 'denied') {
// 		// 	return styles.textRed
// 		// }
// 		// return styles.textWhite
// 	}

// 	render() {
// 		const renderState = store.getState()
// 		// console.log(`[PermissionDisplay] renderState=${JSON.stringify(renderState, null, 4)}`)
// 		// console.log(`[PermissionDisplay] this._getPermissionStyle=${JSON.stringify(this._getPermissionStyle, null, 4)}`)
// 		// console.log(`[PermissionDisplay] this._getPermissionStyle=${JSON.stringify(_getPermissionStyle, null, 4)}`)
// 		return (
// 			<View styles={styles.permissionsDisplay}>
// 				<Text style={styles.permissionsHeader}>Permissions</Text>
// 				{/*
// 				<Text>Camera: {this.state.permissionsCamera ? JSON.stringify(this.state.permissionsCamera, null, 4) : 'not requested'}</Text>
// 				*/}
// 				<Text>Location: {renderState.permissionsLocation ? JSON.stringify(renderState.permissionsLocation, null, 4) : 'not requested'}</Text>
// 				<View style={styles.permissionsList}>
// 					<Text style={styles.textWhite}>Camera:&nbsp;
// 				{/*
// 						{!this.state.permissionsCamera &&
// 							<Text style={styles.textWhite}>Unknown</Text>}
// 						{this.state.permissionsCamera &&
// 							<Text style={this._getPermissionStyle(this.state.permissionsCamera)}>
// 								{this._capitalize(this.state.permissionsCamera.status)}
// 							</Text>}
// 					</Text>
// 					<Text style={styles.textWhite}>Location:&nbsp;
// 						{!renderState.permissionsLocation &&
// 							<Text style={styles.textWhite}>Unknown</Text>}
// 						{renderState.permissionsLocation &&
// 							// <Text>
// 							<Text style={this._getPermissionStyle(renderState.permissionsLocation)}>
// 								{this._capitalize(renderState.permissionsLocation.status)}
// 							</Text>}
// 						*/}
// 					</Text>
// 				</View>
// 			</View>
// 		)
// 	}

// 	_capitalize = (str) => {
// 		if(!str) {
// 			return ''
// 		}
// 		return `${str[0].toUpperCase()}${str.slice(1)}`
// 	}

// PermissionDisplay.propTypes = {
// 	onPermissionUpdate: DefaultProps.func,
// 	permissionsCamera: DefaultProps.shape({
// 		status: DefaultProps.string.isRequired
// 	}),
// 	permissionsLocation: DefaultProps.shape({
// 		status: DefaultProps.string.isRequired
// 	})
// }

export { PermissionDisplay }
