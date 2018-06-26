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
		alignSelf: 'stretch',
		flex: 1,
		// flexDirection: 'row',
		// height: '90%',
		marginBottom: 20,
		// minHeight: 450,
		// minWidth: 600,
		// width: '100%',
	},
	cameraTouchable: {
		alignSelf: 'center',
		backgroundColor: 'rgba(200,200,200,.45)',
		// TODO: figure out why js file can use '100%',
		// but this file must use number
		borderRadius: 99999,
		flex: 1,
		justifyContent: 'center',
		marginTop: '10%',
		marginVertical: 10,
		maxHeight: 200,
		width: 200,
	},
	container: {
		// backgroundColor: '#f0f',
		padding: 20,
		marginBottom: 10
	},
	containerActive: {
		// backgroundColor: '#f0f',
		alignSelf: 'stretch',
		alignItems: 'center',
		flex: 1,
		padding: 20,
		marginBottom: 10
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