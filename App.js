import 'core-js'
import React from 'react'
// import { render } from 'react-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { ImageBackground, View } from 'react-native'
import { ScrollView, View } from 'react-native'
import { Provider } from 'react-redux'

// import { Camera } from 'expo'
import { CameraRenderer } from './containers/CameraRenderer'
// import { CameraRollRenderer } from './containers/CameraRollRenderer'
// import { PermissionDisplay } from './containers/PermissionDisplay'
// import { LocationRenderer } from './containers/LocationRenderer'

import { store } from './store'

import { styles } from './styles'

const localStyles = {
	container: {
		backgroundColor: '#0000c8',
		flex: 1,
		// flexDirection: 'row',
		alignItems: 'stretch',
		alignSelf: 'stretch',
		justifyContent: 'center',
		// minHeight: '100%',
		minWidth: '100%',
		position: 'absolute',
		top: 0
	}
}

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
				{/* Header at top */}
				<View style={[
					{
						backgroundColor: '#ff0',
						height: 20
					}
				]}>
				</View>

				{/* Top section */}
				<View style={[
					{
						backgroundColor: '#0a0',
						flex: 1,
						flexDirection: 'row',
						// margin: 5
					}
				]}>
					<View style={[
						{
							backgroundColor: '#00f',
							flex: 1,
							// margin: 5
						}
					]}>
						<Provider store={store}>
							{/*
							<Router>
								<Route path="/camera">
							*/}
								<CameraRenderer props={store.getState().camera} />
							{/*
								</Route>
							</Router>
							*/}
						</Provider>
						{/* <CameraRollRenderer store={store} /> */}
					</View>
				</View>

				{/* Bottom section */}
				{/*
				<View style={[
					{
						// backgroundColor: '#a00',
						flex: 1,
						// margin: 5
					}
				]}>
				</View>
				*/}
			</View>
			// <ScrollView
			// 	style={{
			// 		backgroundColor: '#0000c8'
			// 	}}
			// 	contentContainerStyle={localStyles.container}>
			// <PermissionDisplay store={store} />
			// <LocationRenderer store={store} />
			// </ScrollView>
		)
	}
}

export { App }
export default App
