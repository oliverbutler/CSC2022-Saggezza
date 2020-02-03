import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { Center } from "@builderx/utils";
import * as Font from "expo-font";

class Login extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    // Dont load the component until font is mounted
    await Font.loadAsync({
      "roboto-regular": require("../../assets/fonts/roboto-regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.root}>
        {this.state.fontLoaded ? (
          <View style={styles.Background}>
            <View style={styles.stackFiller}></View>
            <View style={styles.backgroundGradientStack}>
              <ImageBackground
                style={styles.backgroundGradient}
                imageStyle={styles.backgroundGradient_imageStyle}
                source={require("../../assets/images/gradient-green.png")}
              >
                <View style={styles.mainComponents}>
                  <View style={styles.form}>
                    <View style={styles.signInGoogle}>
                      <IoniconsIcon
                        name="logo-google"
                        style={styles.googleIcon}
                      ></IoniconsIcon>
                      <Text style={styles.signInWithGoogle}>
                        Sign in with Google
                      </Text>
                    </View>
                    <Text style={styles.or}>or</Text>
                    <TouchableOpacity
                      onPress={() => navigate("App")}
                      style={styles.signinButton}
                    >
                      <Text style={styles.signin}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={styles.passwordForm}>
                      <EvilIconsIcon
                        name="lock"
                        style={styles.passwordIcon}
                      ></EvilIconsIcon>
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="rgba(255,255,255,1)"
                        keyboardType="default"
                        secureTextEntry={true}
                        style={styles.password}
                      ></TextInput>
                    </View>
                    <View style={styles.emailForm}>
                      <EvilIconsIcon
                        name="user"
                        style={styles.icon2}
                      ></EvilIconsIcon>
                      <TextInput
                        placeholder="Email"
                        placeholderTextColor="rgba(255,255,255,1)"
                        keyboardType="email-address"
                        secureTextEntry={false}
                        style={styles.emailInput}
                      ></TextInput>
                    </View>
                  </View>
                  <Image
                    source={require("../../assets/images/white.png")}
                    resizeMode="contain"
                    style={styles.logo}
                  ></Image>
                </View>
              </ImageBackground>
              <Center horizontal>
                <View style={styles.footer}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("SignUp")}
                    style={styles.createAccountButton}
                  >
                    <Text style={styles.CreateAccount}>Create Account</Text>
                  </TouchableOpacity>
                  <Text style={styles.NeedHelp}>Need Help?</Text>
                </View>
              </Center>
            </View>
          </View>
        ) : null}
        <StatusBar
          animated={false}
          barStyle="light-content"
          hidden={false}
          backgroundColor="rgba(0,0,0,0)"
        ></StatusBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  Background: {
    height: "100%",
    marginTop: 0
  },
  stackFiller: {
    flex: 1
  },
  backgroundGradient: {
    left: 0,
    height: "100%",
    backgroundColor:
      "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(31,178,204,0.69)",
    position: "absolute",
    right: 0,
    top: 0
  },
  backgroundGradient_imageStyle: {
    opacity: 0.69
  },
  mainComponents: {
    height: 607,
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 56
  },
  form: {
    width: 281,
    height: 277,
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "space-between"
  },
  signInGoogle: {
    height: 59,
    backgroundColor: "rgba(0,172,255,1)",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    opacity: 1,
    flexWrap: "nowrap",
    justifyContent: "center",
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    borderRadius: 5
  },
  googleIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 33
  },
  signInWithGoogle: {
    width: 121,
    height: 15,
    color: "rgba(255,255,255,1)",
    justifyContent: "space-between",
    marginLeft: 10,
    textAlign: "left"
  },
  or: {
    color: "rgba(255,255,255,1)",
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    fontFamily: "roboto-regular"
  },
  signinButton: {
    height: 59,
    backgroundColor: "rgba(145,208,0,1)",
    alignSelf: "stretch",
    opacity: 1,
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    borderRadius: 5
  },
  signin: {
    height: 15,
    color: "rgba(255,255,255,1)",
    justifyContent: "space-between",
    textAlign: "center",
    marginTop: 22
  },
  passwordForm: {
    height: 59,
    backgroundColor: "rgba(253,251,251,0.25)",
    alignSelf: "stretch",
    opacity: 1,
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    borderRadius: 5,
    flexDirection: "row"
  },
  passwordIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  password: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  emailForm: {
    height: 59,
    backgroundColor: "rgba(251,247,247,0.25)",
    alignSelf: "stretch",
    opacity: 1,
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    borderRadius: 5,
    flexDirection: "row"
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginLeft: 20,
    alignSelf: "center"
  },
  emailInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    alignSelf: "center"
  },
  logo: {
    width: 239,
    height: 330,
    flex: 1,
    alignSelf: "center"
  },
  footer: {
    width: 375,
    height: 14,
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-end",
    bottom: 122,
    justifyContent: "space-around"
  },
  createAccountButton: {
    width: 104,
    height: 14
  },
  CreateAccount: {
    color: "rgba(255,255,255,0.5)"
  },
  NeedHelp: {
    color: "rgba(255,255,255,0.5)"
  },
  backgroundGradientStack: {
    height: "100%"
  }
});

export default Login;
