import { Camera } from 'expo'
import PropTypes from 'prop-types'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'

import { styles } from '../styles'

const localStyles = {
	button: {
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
		alignItems: 'center',
		backgroundColor: 'rgba(13, 13, 13, .5)',
		flex: 1,
		justifyContent: 'center'
	},
	contentCell: {
		flex: 1
	},
	footerCell: {
		alignItems: 'center',
		height: 30
	},
	headerCell: {
		alignItems: 'center',
		height: 70,
		justifyContent: 'center'
	},
	headerText: {
		fontSize: 30,
		fontWeight: 'bold'
	}
}

class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Home'
	}

	render () {
		return (
			<View style={localStyles.container}>
				<View style={localStyles.headerCell}>
					<Text style={localStyles.headerText}>React Native Tracker</Text>
				</View>
				<View style={localStyles.contentCell}>
					<Button 
						title="Go to Front Camera" onPress={this._navigateToFrontCamera}
						buttonStyle={[
							localStyles.button,
							{
								backgroundColor: 'rgba(0, 190, 0, 1)'
							}
						]}
						/>
					<Button 
						title="Go to Back Camera" onPress={this._navigateToBackCamera}
						buttonStyle={[
							localStyles.button,
							{
								backgroundColor: 'rgba(0, 0, 190, 1)'
							}
						]} />
				</View>
				<View style={localStyles.footerCell}>
					<Text style={styles.textWhite}>Anthony Williams &copy; 2018</Text>
				</View>
			</View>
		)
	}

	_navigateToBackCamera = () => {
		this.props.navigation.push('Camera', {
			activeCamera: Camera.Constants.Type.back
		})
	}

	_navigateToFrontCamera = () => {
		this.props.navigation.push('Camera', {
			activeCamera: Camera.Constants.Type.front
		})
	}
}

HomeScreen.propTypes = {
	navigation: PropTypes.shape({
		// navigate: PropTypes.func.isRequired
		push: PropTypes.func.isRequired
	}).isRequired
}

export { HomeScreen }
