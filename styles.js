import { StyleSheet } from 'react-native'

const defaultButton = StyleSheet.create({
	borderRadius: 50,
	// marginBottom: 1,
	// marginTop: 1
})

const styles = StyleSheet.create({
	buttonLocation: {
		...defaultButton,
		backgroundColor: '#0aa'
	},
	buttonPermission: {
		...defaultButton,
		backgroundColor: '#aa0'
	},
	container: {
		alignSelf: 'stretch',
		backgroundColor: '#00f',
		flex: 1,
		overflow: 'scroll'
	},
	permissionsHeader: {
		alignSelf: 'stretch',
		backgroundColor: '#0a0',
		color: '#eee',
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: '2.5%',
		marginTop: '5%',
		paddingBottom: '1%',
		paddingTop: '1%',
		textAlign: 'center'
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
	locationDisplay: {
		
	},
	locationContainer: {
		marginBottom: 25,
		marginTop: 25
	},
	locationOverview: {
		alignItems: 'center',
		marginBottom: 25
	},
	permissionsList: {
		alignItems: 'center',
		flex: 0.5,
		marginBottom: '2.5%'
	},
	permissionsDisplay: {
		alignSelf: 'stretch',
		flex: 1,
		justifyContent: 'center'
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
