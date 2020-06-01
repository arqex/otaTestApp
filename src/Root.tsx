
import * as React from 'react';
import {View, Text} from 'react-native';
import * as Updates from 'expo-updates';

export default class Root extends React.Component {
	state = {
		status: 'INIT',
		error: ''
	}

  render() {
		let styles = {
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
			backgroundColor: 'white'
		};

		return (
			<View style={ styles }>
				<Text>Version 3</Text>
				<Text>{ this.getText() }</Text>
				<Text>{ this.state.error }</Text>
			</View>
		);
	}

	getText() {
		switch( this.state.status ){
			case 'INIT':
				return 'Starting...'
			case 'CHECKING':
				return 'Checking for updates...'
			case 'NO_UPDATE':
				return 'No updates available.'
			case 'FETCHING':
				return 'Fetching update...'
			case 'OK':
				return 'Update downloaded. Restart to apply.'
			default:
				return 'WTF?'
		}
	}

	componentDidMount() {
		this.setState({status: 'CHECKING'});

		Updates.checkForUpdateAsync()
			.then( ({isAvailable}) => {
				if( isAvailable) {
					this.setState({status: 'FETCHING'});
					return Updates.fetchUpdateAsync()
						.then( ({isNew}) => {
							if( isNew ){
								this.setState({status: 'OK'})
							}
							else {
								this.setState({status: 'NO_UPDATE'})
							}
						})
					;
				}
				else {
					this.setState({status:'NO_UPDATE'})
				}
			})
			.catch( error => {
				this.setState({
					status: 'WTF',
					error: error.toString()
				});
			})
		;
	}
}
