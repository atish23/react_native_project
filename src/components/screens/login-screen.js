import React, { Component } from 'react';
import { 
  Text,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
 } from 'react-native';

import Reflux from 'reflux';
import Actions from '../../../Actions'
import styled from 'styled-components/native';
// import { COLORS } from 'constants/style';
// import DataStore from 'components/common/Datastore';
import Button from 'components/common/button';
import StyleVars from 'constants/StyleVars';
import Header from 'components/common/header';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  loginButtonContainer: {
    marginTop: 5,
    width: windowWidth * 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    width: windowWidth * 0.8,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.25)"
  },
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: StyleVars.Colors.primary,
    overflow: "visible"
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    backgroundColor: StyleVars.Colors.primary
  },
  inputContainer: {
    width: windowWidth * 0.8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "rgba(255,255,255,0.75)",
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: StyleVars.Colors.primary,
    color: "white",
    fontSize: 16,
    padding: 5
  },
  tpLogo: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    tintColor: StyleVars.Colors.secondary
  },
  socialText: {
    color: "white",
    fontSize: 30,
    marginTop: 8,
    fontWeight: "600",
    marginBottom: 15
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    marginTop: 2,
    marginHorizontal: 10,
    backgroundColor: "rgba(255,255,255, 0.2)"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.5)"
  },
  footerText: {
    color: "white",
    fontSize: 14
  },
  footerActionText: {
    fontWeight: "600"
  }
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignup: false };

    this.email = null;
    this.password = null;
    this.passwordConfirmation = null;
  }
  componentDidMount() {
    Actions.loadUser.completed.listen(this.onLoadUserCompleted.bind(this));
  }

  render() {
    let footerText = this.state.isSignup ? (
      <Text style={styles.footerText}>
        Already signed up? <Text style={styles.footerActionText}>Login.</Text>
      </Text>
    ) : (
      <Text style={styles.footerText}>
        Don't have an account? <Text style={styles.footerActionText}>Sign Up.</Text>
      </Text>
    );

    return (
      <View style={styles.container}>
        <ScrollView
          ref="scrollView"
          keyboardShouldPersistTaps="never"
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false}
          
        >
          <View style={styles.innerContainer}>
            <Text style={styles.socialText}>Community</Text>
            {this.renderForm()}
          </View>
          <View style={styles.horizontalLine} />
          <TouchableOpacity style={styles.footer} activeOpacity={0.8} onPress={() => this.changeSignup()}>
            {footerText}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  renderForm() {
    let passwordConfirmationField = this.state.isSignup ? (
      <View style={styles.inputContainer}>
        <TextInput
          ref={(ref) => this._passwordConfirmationRef = ref}
          placeholder="Password Confirmation"
          placeholderTextColor="rgba(255,255,255,0.75)"
          secureTextEntry={true}
          selectionColor="white"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(password) => this.passwordConfirmation = password}
          returnKeyType="go"
          onSubmitEditing={() => this.submitForm()}
        />
      </View>
    ) : null;

    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.75)"
            keyboardType="email-address"
            selectionColor="white"
            style={styles.input}
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(email) => this.email = email}
            returnKeyType="next"
            onSubmitEditing={() => this._passwordRef.focus()}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={(ref) => this._passwordRef = ref}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.75)"
            secureTextEntry={true}
            selectionColor="white"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(password) => this.password = password}
            returnKeyType={this.state.isSignup ? "next" : "go"}
            onSubmitEditing={() => this.state.isSignup ? this._passwordConfirmationRef.focus() : this.submitForm()}
          />
        </View>
        {passwordConfirmationField}
        <View style={styles.loginButtonContainer}>
          <Button
            onPress={() => this.submitForm()}
            textStyle={{fontSize: 14}}
            style={styles.loginButton}
          >
            {this.state.isSignup ? "Sign Up" : "Login"}
          </Button>
        </View>
      </View>
    );
  }

  submitForm() {
    if (this.state.isSignup) {
      if (!this.email || !this.password || !this.passwordConfirmation)
        return console.error("Missing input fields");
      if (this.password !== this.passwordConfirmation)
        return console.error("Passwords don't match");
      console.log("ddddd")
      Actions.signup({
        email: this.email,
        password: this.password
      });
    } else {
      console.log("dbdhghj")
      Actions.login({
        email: this.email,
        password: this.password
      });
    }
  }

  changeSignup() {
    this.setState({ isSignup: !this.state.isSignup });
  }

  onLoadUserCompleted(user) {
    this.props.navigation.navigate('Main');
  }
}

export default LoginScreen;