import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default Add = () => (
  <View style={styles.container}>
    <Text style={styles.white}>Add Page</Text>
  </View>
)

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