import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.white}>Settings Tab</Text>
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