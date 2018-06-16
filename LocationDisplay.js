import React from 'react'
import { Text, View } from 'react-native'// old version: https://github.com/expo/react-native/archive/sdk-28.0.0.tar.gz
import { Button } from 'react-native-elements'
import { Location, MapView } from 'expo'
import DefaultProps from 'prop-types'

import { styles } from './styles'

class LocationDisplay extends React.Component {
	locationLookupOptions = {
		enableHighAccuracy: true
	}
	locationRefreshDelay = 1000
	locationUpdateTimer = null

	constructor(props) {
		super(props)
		this.state = {
			locationResult: null,
			mapRegion: null,
			updatingLocation: false
		}
	}

	componentWillUnmount() {
		if (this.locationUpdateTimer) {
			clearInterval(this.locationUpdateTimer)
			this.locationUpdateTimer = null
		}
	}

	render() {
		if (!this.props.permissions) {
			return <Text>Location permission was missing</Text>
		}
		return (
			<View style={styles.locationDisplay}>
				<View style={styles.locationContainer}>
					<View style={styles.locationOverview}>
						<Text style={styles.textWhite}>Current Location:&nbsp;
							{this.state.updatingLocation && <Text style={styles.textGreen}>Currently updating location...</Text>}
							<Text style={this.state.locationResult ? styles.textWhite : styles.textRed}>
								{this.state.locationResult ? this.state.locationResult : 'Unknown'}
							</Text>
						</Text>
					</View>
					<Button
						title="Update location once"
						buttonStyle={styles.buttonLocation}
						onPress={async () => await this._getLocationAsync()} />
				</View>
				<View style={styles.mapViewContainer}>
					{this.state.locationResult &&
						<MapView
							style={styles.mapView}
							region={this.state.mapRegion}
							onRegionChange={this._handleMapRegionChange} />
					}
					{/*
					<Button 
						title="Start locator"
						color="#0000aa"
						onPress={async() => await this._startLocationTimer()} />
					*/}
				</View>
			</View>
		)
	}

	_getLocationAsync = async () => {
		if (!this.props.permissions || this.props.permissions.status !== 'granted') {
			console.log(`[LocationDisplay][_getLocationAsync] No permissions, skipping...`, JSON.stringify(this.props, null, 4))
			return
		}
		console.log(`[LocationDisplay][_getLocationAsync] Updating location...`)
		this.setState({ updatingLocation: true })
		const location = await Location.getCurrentPositionAsync(this.locationLookupOptions)
		this.setState({
			locationResult: JSON.stringify(location, null, 4),
			mapRegion: {
				latitude: location.coords.latitude,
				latitudeDelta: 0.0922,
				longitude: location.coords.longitude,
				longitudeDelta: 0.0421
			},
			updatingLocation: false
		})
	}

	_handleMapRegionChange = mapRegion => {
		console.log(`[LocationDisplay][_handleMapRegionChange] Updated mapRegion=${JSON.stringify(mapRegion, null, 4)}`)
		this.setState({ mapRegion })
	}

	// _startLocationTimer = () => this.locationUpdateTimer = setInterval(this._getLocationAsync, this.locationRefreshDelay)
}

LocationDisplay.propTypes = {
	permissions: DefaultProps.shape({
		status: DefaultProps.string.isRequired
	})
}

export { LocationDisplay }
