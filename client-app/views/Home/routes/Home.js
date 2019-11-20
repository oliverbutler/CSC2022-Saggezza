import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

import ButtonExample from '../../../components/ButtonExample';

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Saggezza Expenses',
      headerRight: () => (
        <TouchableHighlight onPress={() => { navigation.navigate('Settings') }}>
          <Image source={require('../../../assets/settings.png')} style={{ width: 25, height: 25, marginRight: 5, tintColor: 'white'}} />
        </TouchableHighlight>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.white}>Home Tab</Text>
        <ButtonExample />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F2F2F',
  },
  white: {
    color: 'white',
  }
}