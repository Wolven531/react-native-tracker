import React from 'react'
import { connect } from 'react-redux'
import { Image, Text } from 'react-native'
import { CameraRoll, ScrollView, View } from 'react-native'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'
// import { Camera } from 'expo'

import { setCameraRollPhotos } from '../actions'
// import { BASE_64_PREFIX } from '../constants/strings'

import { styles } from '../styles'

const localStyles = {
	container: {
		backgroundColor: 'rgba(13, 13, 13, .5)',
		flex: 1,
		flexDirection: 'column',
		paddingBottom: 10
	}
}

class StatelessCameraRollRenderer extends React.Component {
	static navigationOptions = ({ navigation }) => {
		let headerTitle = 'Camera Roll'
		return { headerTitle }
	}
	
	componentDidMount() {
		this.props.loadPhotos()
	}

	render() {
		return (
			<ScrollView style={localStyles.container}
				contentContainerStyle={{
					alignItems: 'center',
					// flex: 1,
					justifyContent: 'space-between',
					padding: 10
				}}>
				{this.props.cameraRollPhotos.map((photo, index) => {
					const { image, location, timestamp } = photo.node
					const { filename, height, playableDuration, uri, width } = image
					const timestampInt = parseInt(timestamp, 10)
					const formattedTime = moment.unix(timestampInt).format('hh:mm:ss a')

					return (
						<View key={index} style={{
								flex: 1,
								marginVertical: 5
							}}>
							<Image
								style={{
									height: 200,
									width: 333,
									// resizeMode: 'stretch'
								}}
								source={{ uri }} />
							<View style={{
								backgroundColor: 'rgba(45, 45, 45, .5)',
								flex: 1,
								padding: 10
							}}>
								<View style={{
										flexDirection: 'row',
										justifyContent: 'space-between'
								}}>
									<Text style={styles.textPink}>
										{filename}
									</Text>
									<Text style={styles.textYellow}>
										{formattedTime}
									</Text>
								</View>
								<View style={{
										flexDirection: 'row',
										justifyContent: 'space-between'
								}}>
									<View style={{
										flexDirection: 'row'
									}}>
										<Text style={styles.textWhite}>Dimensions:&nbsp;</Text>
										<Text style={styles.textOrange}>{width}</Text>
										<Text style={styles.textWhite}>&nbsp;x&nbsp;</Text>
										<Text style={styles.textOrange}>{height}</Text>
										<Text style={styles.textWhite}>&nbsp;px</Text>
									</View>
									{playableDuration > 0 ? <Text style={styles.textGreen}>Is Playable</Text> : <Text style={styles.textWhite}>Static Image</Text>}
								</View>
								{Object.keys(location).length > 0 ? <Text style={styles.textGreen}>Has Location</Text> : <Text style={styles.textWhite}>No Location Data</Text>}
							</View>
						</View>
					)
				})}
			</ScrollView>
		)
	}
}

StatelessCameraRollRenderer.propTypes = {
	cameraRollPhotos: PropTypes.array,
	loadPhotos: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	const { cameraRollPhotos } = state.camera
	return {
		cameraRollPhotos
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadPhotos: () => {
			CameraRoll.getPhotos({
				assetType: 'Photos',
				first: 20
			})
			.then(response => {
				const photos = response.edges
				dispatch(setCameraRollPhotos(photos))
			})
			.catch(err => {
				console.warn(`[CameraRollRenderer] Error getting photos from camera roll: ${err}`)
			})
		}
	}
}

const CameraRollRenderer = connect(mapStateToProps, mapDispatchToProps)(StatelessCameraRollRenderer)

export { CameraRollRenderer }
