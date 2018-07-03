import React from 'react'
import { Text, View } from 'react-native'
import { Slider } from 'react-native-elements'

import { setCameraZoom } from '../actions'

import { styles } from '../styles'

const localStyles = {
	container: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,.5)',
		borderColor: '#ccc',
		borderWidth: 1,
		flexDirection: 'row',
		height: 50,
		justifyContent: 'space-between',
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		paddingLeft: 10
	}
}

const ZoomControl = ({ cameraZoom = 0, store = null }) => {
	return (
		<View style={localStyles.container}>
			<Text style={[ styles.textWhite, { width: 110 } ]}>
				Zoom: {((cameraZoom + 1.0) * 100.0).toFixed(2)}%
			</Text>
			<Slider
				animateTransitions={true}
				animationType={'spring'}
				maximumValue={110}
				minimumValue={100}
				onValueChange={newValue => {
					const actualZoom = (newValue - 100.0) / 100.0
					if (!store) {
						return
					}
					store.dispatch(setCameraZoom(actualZoom))
				}}
				step={0.05}
				value={(cameraZoom + 1.0) * 100.0}
				style={[
					{
						flex: 1,
						marginLeft: 10,
						marginRight: 30
					}
				]}
			/>
		</View>
	)
}

export { ZoomControl }
