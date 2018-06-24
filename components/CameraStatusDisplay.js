import React from 'react'
import { Text, View } from 'react-native'
import { Camera } from 'expo'
// import DefaultProps from 'prop-types'

import { styles } from '../styles'

const localStyles = {
	container: {
		alignItems: 'stretch',
		alignSelf: 'center',
		backgroundColor: '#333',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		width: 200
	}
}

const CameraStatusDisplay = (props) => {
	let cameraStatusStyle = styles.textRed
	let cameraStatus = 'Inactive'

	if (props.activeCamera) {
		cameraStatusStyle = styles.highlightGreen

		switch(props.activeCamera) {
			case Camera.Constants.Type.back:
				cameraStatus = 'Back'
			break;
			case Camera.Constants.Type.front:
				cameraStatus = 'Front'
			break;
			default:
				cameraStatus = 'Unknown'
			break;
		}
	}

	return (
		<View style={localStyles.container}>
			<Text style={styles.textWhite}>Active Camera: </Text>
			<Text style={cameraStatusStyle}>{cameraStatus}</Text>
		</View>
	)
}

export { CameraStatusDisplay }
