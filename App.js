/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Platform,
  Button,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';

// import * as ImagePicker from "expo-image-picker";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { RNPhotoEditor } from 'react-native-photo-editor';

const App: () => React$Node = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  var RNFS = require('react-native-fs');

  const reset = () => {
    setError("");
    setPassword("");
    setConfirm("");
    setName("");
    setImage(null);
  };

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  const startSignUp = () => {
    setSignUp(true);
    setError(false);
  };

  const cancel = () => {
    setSignUp(false);
  };

  const signUpPressed = () => {
    setLoggedIn(true);
    setSignUp(false);
    reset();
  };

  const openPhotos = () =>{
  switch(Platform.OS){
    case "ios":
      Linking.openURL("photos-redirect://");
    break;
    case "android":
      Linking.openURL("content://media/internal/images/media");
    break;
    default:
      console.log("Could not open gallery app");
   }
  }

  const EnterEditor = () =>{
    RNPhotoEditor.Edit({
        path: RNFS.DocumentDirectoryPath + "/photo.jpg"
    });
    path = RNFS.DocumentDirectoryPath
  }

  if (loggedIn) {
    return (
      <ScrollView
        contentContainerStyle={styles.loginView}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={styles.logoLogin}>CoPics</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={EnterEditor}
            activeOpacity={0.7}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "white",
              borderRadius: 100,
              marginBottom: 20
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 100 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }else if (signUp){
    return (
      <ScrollView
        contentContainerStyle={styles.loginView}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={styles.logoSignup}>CoPics</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={EnterEditor}
            activeOpacity={0.7}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "white",
              borderRadius: 100,
              marginBottom: 20
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 100 }}
              />
            )}
          </TouchableOpacity>
        </View>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={"Phone"}
          style={styles.inputField}
        />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={"Name"}
          style={styles.inputField}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Password"}
          style={styles.inputField}
        />
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder={"Confirm password"}
          style={styles.inputField}
        />
        <TouchableOpacity
          onPress={signUpPressed}
          style={styles.signupViewButton}
          activeOpacity={0.8}
        >
          <Text style={styles.signinButtonText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Cancel" onPress={cancel} color="grey" />
      </ScrollView>
    );
  }else{
    return (
      <ScrollView
        contentContainerStyle={styles.loginView}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={styles.logoLogin}>CoPics</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={"Phone"}
          style={styles.inputField}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Password"}
          style={styles.inputField}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={logIn}
            style={styles.signinButton}
            activeOpacity={0.8}
          >
            <Text style={styles.signinButtonText}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.signupButtonContainer}>
            <Button title="Sign up" onPress={startSignUp} color="grey" />
          </View>
        </View>
        <Text style={{ color: "red" }}>{error}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logoLogin: {
    fontSize: 55,
    marginBottom: 100,
    color: "#71D2D2"
  },
  logoSignup: {
    fontSize: 55,
    marginBottom: 50,
    color: "#71D2D2"
  },
  loginView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    paddingHorizontal: 50
  },
  inputField: {
    backgroundColor: "white",
    width: "90%",
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 40,
    fontSize: 16
  },
  signinButton: {
    marginTop: 20,
    backgroundColor: "#5ACFCF",
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  signupViewButton: {
    marginTop: 20,
    backgroundColor: "#5ACFCF",
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  signinButtonText: {
    color: "white",
    fontSize: 18
  },
  signupButtonContainer: {
    marginTop: 10
  }
});

export default App;
