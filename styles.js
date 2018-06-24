import { StyleSheet } from 'react-native'

const defaultButton = {
	// borderRadius: '100%',
	borderRadius: 99999
}

const styles = StyleSheet.create({
	defaultButton: {// expose default
		...defaultButton
	},
	container: {
		alignSelf: 'stretch',
		backgroundColor: '#00f',
		flex: 1,
		overflow: 'scroll'
	},
	mapView: {
		...StyleSheet.absoluteFillObject,
		left: 10,
		right: 10
	},
	mapViewContainer: {
		marginTop: 25,
		minHeight: 200
	},
	highlightGreen: {
		backgroundColor: '#0f0',
		color: '#333'
	},
	highlightRed: {
		backgroundColor: '#f00',
		color: '#fff'
	},
	highlightWhite: {
		backgroundColor: '#eee',
		color: '#333'
	},
	textGreen: {
		color: '#0f0'
	},
	textRed: {
		color: '#f00'
	},
	textWhite: {
		color: '#eee'
	}
})

export { styles }
