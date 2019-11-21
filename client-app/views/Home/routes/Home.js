import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

export default class Home extends React.Component {
  render() {
    return (
      <ImageBackground
        style={styles.backgroundGradient}
        imageStyle={styles.backgroundGradient_imageStyle}
        source={require("../../../assets/images/Gradient_YHPVqJX.png")}
      >
        <View style={styles.container}>
          <View style={styles.header}> 
            <Text style={styles.headerTitle}>Welcome Oliver...</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <EvilIconsIcon name="gear" style={styles.headerIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>Heres some lovely content!</Text>
            <Image
              style={{width: 250, height: 200, margin: 20}}
              source={{uri: 'https://media.giphy.com/media/yYSSBtDgbbRzq/source.gif'}} />
            <Text style={styles.text}>^ Hey look, a gif</Text>
          </View>
        </View>  
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerIcon: {
    color: 'white',
    fontSize: 30,
  },
  content: {
    margin: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  backgroundGradient: {
    left: 0,
    height: '100%',
    backgroundColor:
      "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(31,178,204,0.69)",
    position: "absolute",
    right: 0,
    top: 0
  },
  backgroundGradient_imageStyle: {
    opacity: 0.69
  },
});