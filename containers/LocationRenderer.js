import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Location, MapView } from 'expo'
// import DefaultProps from 'prop-types'

// import { store } from '../store'

// import { styles } from '../styles'

class LocationRenderer extends React.Component {
	locationLookupOptions = {
		enableHighAccuracy: true
	}
	locationRefreshDelay = 1000
	// locationUpdateTimer = null

	constructor(props){
		super(props)
		this.state = props.store.getState()
		props.store.subscribe(() => {
			this.setState({
				locationResult: this.props.store.getState().locationResult,
				mapRegion: this.props.store.getState().mapRegion,
				updatingLocation: this.props.store.getState().updatingLocation,
				permissionsLocation: this.props.store.getState().permissionsLocation
			})
		})
	}

	// componentWillUnmount() {
	// 	if (this.locationUpdateTimer) {
	// 		clearInterval(this.locationUpdateTimer)
	// 		this.locationUpdateTimer = null
	// 	}
	// }

	render() {
		console.log(`[LocationRenderer][render]`)
		if (!this.state.permissionsLocation) {
			console.log(`[LocationRenderer][render] No perms`)
			return (
				<View style={{
					alignSelf: 'stretch',
					backgroundColor: '#f00',
					flex: 1,
					minHeight: 500,
					minWidth: 500
				}}>
					<Text>Location permission was missing</Text>
				</View>
			)
		}
		console.log(`[LocationRenderer][render] Had permissions`)
		return (
			<View style={{
				// alignSelf: 'stretch',
				backgroundColor: '#f00',
				// flex: 1,
				minHeight: 100,
				minWidth: 100
			}}>
				<Text>Location Renderer</Text>
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

export { LocationRenderer }
