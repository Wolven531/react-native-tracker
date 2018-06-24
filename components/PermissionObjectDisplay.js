import React from 'react'
import { Text, View } from 'react-native'

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
	const permissionStatus = (props.permission && capitalize(props.permission.status)) || 'Unknown'

	return (
		<View style={localStyles.container}>
			{/*
			<Text>{JSON.stringify(props.permission, null, 4)}</Text> 
			*/}
			<Text style={styles.textWhite}>{capitalize(props.title)}: </Text>
			<Text style={getPermissionTextStyle(props.permission)}>{capitalize(permissionStatus)}</Text>
		</View>
	)
}

export { PermissionObjectDisplay }
