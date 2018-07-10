import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { Permissions } from 'expo'
import PropTypes from 'prop-types'

// import { CameraStatusDisplay } from '../components/CameraStatusDisplay'
import { PermissionObjectDisplay } from '../components/PermissionObjectDisplay'

import {
	setPermissionCamera,
	setPermissionLocation
} from '../actions'

// import { styles } from './styles'

const localStyles = {
	buttonPermission: {
		backgroundColor: '#0ff',
		borderRadius: 99999,
		borderWidth: 2,
		marginVertical: 5,
		paddingHorizontal: 75,
		paddingVertical: 20,
		shadowOffset: {
			height: 10,
			width: 10
		},
		shadowOpacity: .5,
		shadowRadius: 10
	},
	container: {
		backgroundColor: 'rgba(13, 13, 13, .5)',
		flex: 1
	},
	header: {
		color: '#eee',
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 20,
		textAlign: 'center'
	}
}

class StatelessPermissionDisplay extends React.Component {
	static navigationOptions = {
		headerTitle: 'Permissions'
	}

	componentDidMount() {
		setTimeout(this.props.loadPermissionsAsync, 0)
	}

	render() {
		return (
			<View style={localStyles.container}>
				{this._renderOverview()}
				<View style={{ marginVertical: 10 }}>
					<Button
						buttonStyle={localStyles.buttonPermission} color="#333"
						title="Prompt for permissions"
						onPress={async () => await this.props.askPermissionsAsync()} />
				</View>
			</View>
		)
	}

	_renderOverview = () =>
		<View style={{ flex: 1 }}>
			<PermissionObjectDisplay permission={this.props.permissionCamera} title={"Camera"} />
			<PermissionObjectDisplay permission={this.props.permissionLocation} title={"Location"} />
			{/* <CameraStatusDisplay activeCamera={this.state.activeCamera} /> */}
		</View>
}

StatelessPermissionDisplay.propTypes = {
	askPermissionsAsync: PropTypes.func.isRequired,
	loadPermissionsAsync: PropTypes.func.isRequired,
	permissionCamera: PropTypes.object,
	permissionLocation: PropTypes.object
}

const mapStateToProps = state => {
	const { permissionCamera, permissionLocation } = state.permission
	console.log(`state = ${JSON.stringify(state, null, 4)}`)
	return {
		permissionCamera,
		permissionLocation
	}
}

const mapDispatchToProps = dispatch => {
	return {
		askPermissionsAsync: async () => {
			const permissionCamera = await Permissions.askAsync(Permissions.CAMERA)
			const permissionLocation = await Permissions.askAsync(Permissions.LOCATION)

			dispatch(setPermissionLocation(permissionLocation))
			dispatch(setPermissionCamera(permissionCamera))
		},
		loadPermissionsAsync: async () => {
			const permissionLocation = await Permissions.getAsync(Permissions.LOCATION)
			const permissionCamera = await Permissions.getAsync(Permissions.CAMERA)

			dispatch(setPermissionLocation(permissionLocation))
			dispatch(setPermissionCamera(permissionCamera))
		}
	}
}

const PermissionDisplay = connect(mapStateToProps, mapDispatchToProps)(StatelessPermissionDisplay)

export { PermissionDisplay }
