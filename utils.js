import React from 'react'
import { View } from 'react-native'
// import DefaultProps from 'prop-types'
// import { styles } from './styles'

const wrapWithMarginBottom = jsxElement => <View style={{flex:1, marginBottom: 10}}>{jsxElement}</View>

export {
	wrapWithMarginBottom
}
