
import * as React from 'react';
import {View, Text} from 'react-native';

export default class Root extends React.Component {
  render() {
		let styles = {
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
			backgroundColor: 'white'
		};

		return (
			<View style={ styles }>
				<Text>Version 1</Text>
			</View>
		);
	}
}
