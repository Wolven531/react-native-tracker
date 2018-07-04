import React from 'react'
// NOTE: Regarding rendering images in react native:
// Image is for simple image display
// ImageBackground is for nesting things inside the image
import { Image, Text } from 'react-native'
import { CameraRoll, ScrollView, View } from 'react-native'
// import { Button } from 'react-native-elements'
// import { Camera } from 'expo'

import { setCameraRollPhotos } from '../actions'
// import { BASE_64_PREFIX } from '../constants/strings'

import { styles } from '../styles'

class CameraRollRenderer extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		this.state = store.getState()
		store.subscribe(() => {
			const { cameraRollPhotos } = store.getState()
			this.setState({
				cameraRollPhotos
			})
		})
	}

	componentDidMount() {
		CameraRoll.getPhotos({
			first: 20,
			assetType: 'Photos'
		})
		.then(response => {
			const photos = response.edges
			this.props.store.dispatch(setCameraRollPhotos(photos))
		})
		.catch(err => {
			console.warn(`[CameraRollRenderer] Error getting photos from camera roll: ${err}`)
		})
	}

	render() {
		return (
			<ScrollView style={{
				flex: 1
			}}
				contentContainerStyle={{
					alignItems: 'center',
					// flex: 1,
					justifyContent: 'space-between',
					padding: 10
				}}>
				{this.state.cameraRollPhotos.map((photo, index) => {
					const { image, location } = photo.node
					const { filename, uri, playableDuration } = image
					return (
						<View key={index} style={{
								flex: 1,
								marginVertical: 5
							}}>
							<Image
								style={{
									height: 150,
									width: 200,
									// resizeMode: 'stretch'
								}}
								source={{ uri }} />
							<Text style={styles.textWhite}>
								{filename}
							</Text>
							{playableDuration > 0 ? <Text style={styles.textGreen}>Is Playable</Text> : <Text style={styles.textWhite}>Static Image</Text>}
							{Object.keys(location).length > 0 ? <Text style={styles.textGreen}>Has Location</Text> : <Text style={styles.textWhite}>No Location Data</Text>}
						</View>
					)
				})}
			</ScrollView>
		)
	}
}

export { CameraRollRenderer }
