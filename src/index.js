import 'core-js' // NOTE: `core-js` required for Android emulator
import React from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'

import { store } from './store'
import { styles } from './styles'

const localStyles = { }

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
						<Text>Hey there from `src/index.js`!</Text>
					</Provider>
					{/* <CameraRollRenderer /> */}
				</View>
			</View>
		)
	}
}

export { App }
export default App
