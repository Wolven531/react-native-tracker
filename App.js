import 'core-js' // NOTE: `core-js` required for Android emulator
import React from 'react'
// import { ImageBackground } from 'react-native'
import { ScrollView, Text, View } from 'react-native'
// import { Button } from 'react-native-elements'
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'

import { CameraRenderer } from './containers/CameraRenderer'
import { HomeScreen } from './containers/HomeScreen'
// import { CameraRollRenderer } from './containers/CameraRollRenderer'
// import { PermissionDisplay } from './containers/PermissionDisplay'
// import { LocationRenderer } from './containers/LocationRenderer'

import { store } from './store'

import { styles } from './styles'

const localStyles = { }

const RootStack = createStackNavigator(
	{
		// Home: {
		// 	screen: HomeScreen
		// },
		Home: HomeScreen,
		// Camera: {
		// 	screen: CameraRenderer
		// }
		Camera: CameraRenderer
	},
	{
		initialRouteName: 'Home'
	}
)

class App extends React.Component {
	render() {
		return (
			<View style={[
				{
					justifyContent: 'space-between',
					backgroundColor: '#00a',
					flex: 1
				}
			]}>
				<View style={[
					{
						backgroundColor: '#ff0',
						height: 20
					}
				]}>
				</View>
				<View style={[
					{
						backgroundColor: '#0a0',
						flex: 1,
						flexDirection: 'row'
					}
				]}>
					<View style={[
						{
							backgroundColor: '#00f',
							flex: 1
						}
					]}>
						<Provider store={store}>
							<RootStack />
						</Provider>
						{/* <CameraRollRenderer /> */}
					</View>
				</View>
				{/*
				<View style={[
					{
						// backgroundColor: '#a00',
						flex: 1
					}
				]}>
				</View>
				*/}
			</View>
		)
	}
}

export { App }
export default App
