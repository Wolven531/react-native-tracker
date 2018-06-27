import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Camera } from 'expo'

import {
	setActiveCamera,
	setPhoto
} from '../actions'

import { wrapWithMarginBottom } from '../utils'

// import { styles } from '../styles'

const localStyles = {
	buttonSwitchCamera: {
		// borderRadius: styles.defaultButton.borderRadius,
		backgroundColor: '#fa0',
		borderRadius: 99999
	},
	camera: {
		alignItems: 'flex-end',
		alignSelf: 'stretch',
		flex: 1,
		justifyContent: 'space-between',
		// flexDirection: 'row',
		// height: '90%',
		marginBottom: 10,
		minHeight: 350,
		// minWidth: 600,
		// width: '100%',
	},
	cameraTouchable: {
		alignSelf: 'flex-end',
		backgroundColor: 'rgba(200,200,200,.65)',
		// TODO: figure out why js file can use '100%',
		// but this file must use number
		borderRadius: 99999,
		flex: 1,
		// justifyContent: 'space-between',
		margin: 20,
		// marginVertical: 10,
		maxHeight: 80,
		width: 80,
	},
	container: {
		// backgroundColor: '#f0f',
		alignSelf: 'stretch',
		alignItems: 'stretch',
		flex: 1,
		padding: 10,
		// paddingLeft: 20,
		// paddingRight: 20
	},
	containerActive: {
		// backgroundColor: '#f0f',
		alignSelf: 'stretch',
		alignItems: 'stretch',
		flex: 1,
		padding: 10
		// paddingBottom: 10,
		// paddingLeft: 20,
		// paddingRight: 20
	}
}

const takePicture = (cam, targetStore) => {
	cam.takePictureAsync({
		quality: 0.1,
		base64: true,
		exif: false
	}).then(photo => {
		// console.log(`[PermissionDisplay] Got a picture=${JSON.stringify(photo, null, 4)}`)
		targetStore.dispatch(setPhoto(photo))
	})
}

class CameraRenderer extends React.Component {
	constructor(props){
		super(props)
		this.state = props.store.getState()
		props.store.subscribe(() => {
			this.setState({
				photo: this.props.store.getState().photo,
				activeCamera: this.props.store.getState().activeCamera
			})
		})
	}

	render(){
		return (
			<View style={this.state.activeCamera ? localStyles.containerActive : localStyles.container}>
				{this.state.activeCamera ?
					<Camera
						style={localStyles.camera}
						type={this.state.activeCamera}
						ref={cam => this.camera = cam}>
						<TouchableOpacity
							style={localStyles.cameraTouchable}
							onPress={() => { takePicture(this.camera, this.props.store) }}/>
					</Camera>
					:
					null
				}
				<Button
					buttonStyle={localStyles.buttonSwitchCamera}
					title="Switch Camera"
					onPress={this._switchCamera} />
			</View>
		)
	}

	_switchCamera = () => {
		console.log(`[App][_switchCamera]`)
		switch(this.state.activeCamera) {
			case Camera.Constants.Type.back:
				this.props.store.dispatch(setActiveCamera(null))
			break;
			case Camera.Constants.Type.front:
				this.props.store.dispatch(setActiveCamera(Camera.Constants.Type.back))
			break;
			default:
				this.props.store.dispatch(setActiveCamera(Camera.Constants.Type.front))
			break;
		}
	}
}

export { CameraRenderer }