import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Location, MapView, Permissions } from 'expo'
import { connect } from 'react-redux'
import moment from 'moment-timezone'

import {
	setNewLocation,
	setPermissionLocation,
	setUpdatingLocation
} from '../actions'
// import DefaultProps from 'prop-types'
// import { styles } from '../styles'

const localStyles = {
	buttonGetLocation: {
		backgroundColor: '#3f3',
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
		alignItems: 'stretch',
		backgroundColor: 'rgba(13, 13, 13, .5)',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		paddingBottom: 10
	}
}

class StatelessLocationRenderer extends React.Component {
	static navigationOptions = ({ navigation }) => {
		let headerTitle = 'Map'
		return { headerTitle }
	}

	locationLookupOptions = {
		enableHighAccuracy: true
	}
	locationRefreshDelay = 1000
	// locationUpdateTimer = null

	componentDidMount() {
		setTimeout(this.props.loadPermissionsAsync, 0)
	}

	// componentWillUnmount() {
	// 	if (this.locationUpdateTimer) {
	// 		clearInterval(this.locationUpdateTimer)
	// 		this.locationUpdateTimer = null
	// 	}
	// }

	render () {
		if (!this.props.permissionLocation) {
			return (
				<View style={{
					alignSelf: 'stretch',
					backgroundColor: '#rgba(255, 0, 0, .5)',
					flex: 1,
					justifyContent: 'flex-start',
					paddingTop: 25
				}}>
					<Text style={{ textAlign: 'center' }}>Location permission was missing</Text>
				</View>
			)
		}
		return (
			<View style={localStyles.container}>
				{/*
				<Text style={{ textAlign: 'center' }}>Location Renderer</Text>
				<Text style={{ textAlign: 'center' }}>Location is {this.props.locationIsUpdating ? 'updating...' : 'updated.'}</Text>
				*/}
				{this._renderCurrentLocation(this.props.locationResult, this.props.mapRegion)}
				<Button
					title="Update location once"
					buttonStyle={[ localStyles.buttonGetLocation ]}
					onPress={async () => await this.props.getLocationAsync()} />
			</View>
			// <View style={styles.locationDisplay}>
			// 	<View style={styles.mapViewContainer}>
			// 		{/*
			// 		<Button 
			// 			title="Start locator"
			// 			color="#0000aa"
			// 			onPress={async() => await this._startLocationTimer()} />
			// 		*/}
			// 	</View>
			// </View>
		)
	}

	_renderCurrentLocation = (location, mapRegion) => {
		if (!location || !mapRegion) {
			return null
		}
		const timestampInt = parseInt(location.timestamp, 10)
		const formattedTime = moment(timestampInt).format('MMM Do YY hh:mm:ss a')
		return (
			<View style={{
				alignItems: 'center',
				flex: 1,
				justifyContent: 'space-evenly'
			}}>
				<MapView
					style={{
						flex: .9,
						// height: 300,
						width: 300
					}}
					region={mapRegion}
					// onRegionChange={this._handleMapRegionChange}
					/>
				<Text>Last updated: {formattedTime}</Text>
			</View>
		)
	}

	// _handleMapRegionChange = mapRegion => {
	// 	console.log(`[LocationRenderer][_handleMapRegionChange] Updated mapRegion=${JSON.stringify(mapRegion, null, 4)}`)
	// 	this.setState({ mapRegion })
	// }

	// _startLocationTimer = () => this.locationUpdateTimer = setInterval(this._getLocationAsync, this.locationRefreshDelay)
}

const mapStateToProps = state => {
	const { permissionLocation } = state.permission
	const { locationIsUpdating, locationResult, mapRegion } = state.location
	return {
		locationIsUpdating,
		locationResult,
		mapRegion,
		permissionLocation
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getLocationAsync: async () => {
			// dispatch(setUpdatingLocation(true))
			const location = await Location.getCurrentPositionAsync(this.locationLookupOptions)
			dispatch(setNewLocation(location))
		},
		loadPermissionsAsync: async () => {
			const permissionLocation = await Permissions.getAsync(Permissions.LOCATION)
			dispatch(setPermissionLocation(permissionLocation))
		}
	}
}

const LocationRenderer = connect(mapStateToProps, mapDispatchToProps)(StatelessLocationRenderer)

export { LocationRenderer }
