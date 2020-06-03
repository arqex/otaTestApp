
import * as React from 'react';
import {ScrollView, Text} from 'react-native';
import * as Updates from 'expo-updates';

export default class Root extends React.Component {
	state = {
		status: 'INIT',
		error: '',
		manifest: ''
	}

  render() {
		let styles = {
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
			backgroundColor: 'white'
		};

		return (
			<ScrollView style={ styles }>
				<Text>Version 1</Text>
				<Text>{ this.getText() }</Text>
				<Text>{ 'Current: ' + JSON.stringify( Updates.updateId  ) }</Text>
				<Text>{ this.state.error }</Text>
			</ScrollView>
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
			.then( ({isAvailable, manifest}) => {
				if( isAvailable) {
					return this.fetchUpdate( manifest );
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

	fetchUpdate( m ) {
		this.setState({status: 'FETCHING', manifest: JSON.stringify(m)});
					
		return Updates.fetchUpdateAsync()
			.then( ({isNew, manifest}) => {
				if( isNew ){
					this.setState({status: 'OK', manifest: JSON.stringify(manifest)})
				}
				else {
					this.setState({status: 'NO_UPDATE'})
				}
			})
		;
	}
}
