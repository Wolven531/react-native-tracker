import React from 'react'
import { Text, View } from 'react-native'
import { Slider } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
		marginHorizontal: 10,
		paddingLeft: 10
	},
	slider: {
		flex: 1,
		marginLeft: 10,
		marginRight: 30
	}
}

const ZoomControl = ({ cameraZoom = 0, onZoomUpdate }) => {
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
				onValueChange={onZoomUpdate}
				step={0.05}
				value={(cameraZoom + 1.0) * 100.0}
				style={localStyles.slider}
			/>
		</View>
	)
}

ZoomControl.propTypes = {
	cameraZoom: PropTypes.number,
	onZoomUpdate: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	const { cameraZoom } = state.camera
	return {
		cameraZoom
	}
}

const mapDispatchToProps = dispatch => {
	const onZoomUpdate = newValue => {
		const actualZoom = (newValue - 100.0) / 100.0
		dispatch(setCameraZoom(actualZoom))
	}

	return {
		onZoomUpdate
	}
}

ZoomControl = connect(mapStateToProps, mapDispatchToProps)(ZoomControl)

export { ZoomControl }
