import React from 'react'
// import { ImageBackground } from 'react-native'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'

// import { styles } from '../styles'

const localStyles = {
	container: {
		alignSelf: 'stretch',
		backgroundColor: 'rgba(255, 0, 0, 1)',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	}
}

class TitleBar extends React.Component {
	render() {
		return (
			<View style={localStyles.container}>
				<Text>{this.props.children}</Text>
			</View>
		)
	}
}

TitleBar.propTypes = {
	allowFontScaling: PropTypes.bool,
	children: PropTypes.string.isRequired,
	style: PropTypes.object
}

export { TitleBar }
