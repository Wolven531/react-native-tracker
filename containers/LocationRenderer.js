import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
// import { Location, MapView } from 'expo'
import { Permissions } from 'expo'
import { connect } from 'react-redux'

import { setPermissionLocation } from '../actions'
// import DefaultProps from 'prop-types'

// import { store } from '../store'

// import { styles } from '../styles'

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
					// backgroundColor: '#f00',
					flex: 1,
					justifyContent: 'flex-start',
					paddingTop: 25
				}}>
					<Text style={{ textAlign: 'center' }}>Location permission was missing</Text>
				</View>
			)
		}
		return (
			<View style={{
				alignSelf: 'stretch',
				// backgroundColor: '#f00',
				flex: 1,
				// minHeight: 100,
				// minWidth: 100
			}}>
				<Text style={{ textAlign: 'center' }}>Location Renderer</Text>
			</View>
			// <View style={styles.locationDisplay}>
			// 	<View style={styles.locationContainer}>
			// 		<View style={styles.locationOverview}>
			// 			<Text style={styles.textWhite}>Current Location:&nbsp;
			// 				{this.state.updatingLocation && <Text style={styles.textGreen}>Currently updating location...</Text>}
			// 				<Text style={this.state.locationResult ? styles.textWhite : styles.textRed}>
			// 					{this.state.locationResult ? this.state.locationResult : 'Unknown'}
			// 				</Text>
			// 			</Text>
			// 		</View>
			// 		<Button
			// 			title="Update location once"
			// 			buttonStyle={styles.buttonLocation}
			// 			onPress={async () => await this._getLocationAsync()} />
			// 	</View>
			// 	<View style={styles.mapViewContainer}>
			// 		{this.state.locationResult &&
			// 			<MapView
			// 				style={styles.mapView}
			// 				region={this.state.mapRegion}
			// 				onRegionChange={this._handleMapRegionChange} />
			// 		}
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

	// _getLocationAsync = async () => {
	// 	if (!this.props.permissions || this.props.permissions.status !== 'granted') {
	// 		console.log(`[LocationRenderer][_getLocationAsync] No permissions, skipping...`, JSON.stringify(this.props, null, 4))
	// 		return
	// 	}
	// 	console.log(`[LocationRenderer][_getLocationAsync] Updating location...`)
	// 	this.setState({ updatingLocation: true })
	// 	const location = await Location.getCurrentPositionAsync(this.locationLookupOptions)
	// 	this.setState({
	// 		locationResult: JSON.stringify(location, null, 4),
	// 		mapRegion: {
	// 			latitude: location.coords.latitude,
	// 			latitudeDelta: 0.0922,
	// 			longitude: location.coords.longitude,
	// 			longitudeDelta: 0.0421
	// 		},
	// 		updatingLocation: false
	// 	})
	// }

	// _handleMapRegionChange = mapRegion => {
	// 	console.log(`[LocationRenderer][_handleMapRegionChange] Updated mapRegion=${JSON.stringify(mapRegion, null, 4)}`)
	// 	this.setState({ mapRegion })
	// }

	// _startLocationTimer = () => this.locationUpdateTimer = setInterval(this._getLocationAsync, this.locationRefreshDelay)
}

// LocationRenderer.propTypes = {
// 	permissions: DefaultProps.shape({
// 		status: DefaultProps.string.isRequired
// 	})
// }

const mapStateToProps = state => {
	const { permissionLocation } = state.permission
	return {
		locationResult: null,
		mapRegion: null,
		permissionLocation,
		updatingLocation: null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadPermissionsAsync: async () => {
			const permissionLocation = await Permissions.getAsync(Permissions.LOCATION)
			dispatch(setPermissionLocation(permissionLocation))
		}
	}
}

const LocationRenderer = connect(mapStateToProps, mapDispatchToProps)(StatelessLocationRenderer)

export { LocationRenderer }
