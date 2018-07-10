import 'core-js' // NOTE: `core-js` required for Android emulator
import React from 'react'
// import { ImageBackground } from 'react-native'
import { ScrollView, Text, View } from 'react-native'
// import { Button } from 'react-native-elements'
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'

import { CameraRenderer } from './containers/CameraRenderer'
import { HomeScreen } from './components/HomeScreen'
import { TitleBar } from './components/TitleBar'
// import { CameraRollRenderer } from './containers/CameraRollRenderer'
import { PermissionDisplay } from './containers/PermissionDisplay'
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
		Camera: CameraRenderer,
		Permission: PermissionDisplay
	},
	{
		initialRouteName: 'Home',
		navigationOptions: {
			headerStyle: {
				backgroundColor: 'rgba(0, 255, 255, 1)',
			},
			headerTintColor: '#333',
			headerTitle: <TitleBar>default navigation title in App.js</TitleBar>,
			// headerTitleStyle: {
			// 	fontWeight: 'bold'
			// }
		}
	}
)

class App extends React.Component {
	render() {
		return (
			<View style={{
				backgroundColor: '#00a',
				flex: 1,
				justifyContent: 'space-around'
			}}>
				<View style={{
					backgroundColor: '#0a0',
					flex: 1
				}}>
					<Provider store={store}>
						<RootStack />
					</Provider>
					{/* <CameraRollRenderer /> */}
				</View>
			</View>
		)
	}
}

export { App }
export default App
