import React from 'react'
import { Text, View } from 'react-native'

import { styles } from '../styles'

const localStyles = {
	container: {
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#333',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// maxHeight: 40,
		paddingHorizontal: 10
	}
}

const capitalize = (str) => {
	if (!str) {
		return ''
	}
	return `${str[0].toUpperCase()}${str.slice(1)}`
}

const getPermissionTextStyle = (permissionObj) => {
	if (!permissionObj) {
		return styles.textWhite
	}
	if (permissionObj.status === 'granted') {
		return styles.highlightGreen
	}
	if (permissionObj.status === 'denied') {
		return styles.textRed
	}
	return styles.textWhite
}

const PermissionObjectDisplay = (props) => {
	const status = (props.permission && capitalize(props.permission.status)) || 'Unknown'

	return (
		<View style={localStyles.container}>
			{/*
			<Text>{JSON.stringify(props.permission, null, 4)}</Text> 
			*/}
			<Text style={styles.textWhite}>{capitalize(props.title)}: </Text>
			<Text style={getPermissionTextStyle(props.permission)}>{capitalize(status)}</Text>
		</View>
	)
}

export { PermissionObjectDisplay }
