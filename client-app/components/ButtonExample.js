import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export default class ButtonExample extends React.Component {
  state = {
    count: 0
  }

  handleClick = (amount) => { // Take amount as parameter
    this.setState(({ count }) => ({ // Set the value of the components prop called count
      count: count + amount
    }));
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.title}>Button Demo</Text>
        <Text>Count: {this.state.count}</Text>
        <Button title="+1" onPress={() => this.handleClick(1)}/>
        <Button title="-1" onPress={() => this.handleClick(-1)}/>
        { this.state.count > 10 && // Conditionally render some text with inline JS 😍
          <Text>Over ten!!</Text>
        }
      </View>
    )
  }
}

style = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '600'
  }
})