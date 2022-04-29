import React, { Component } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import * as DocumentPicker from "expo-document-picker";
import { Fontisto } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Platform } from "expo-modules-core";
import * as Sharing from "expo-sharing";

export default class AdminScreen extends Component {
  name = "";
  numberOfQuestion = 0;
  dirname = "";

  constructor(props) {
    super(props);
    AsyncStorage.getItem("FILE_NAME").then((data) => {
      if (data) this.name = data;
      this.setState({});
    });
    AsyncStorage.getItem("NO_QUES").then((data) => {
      if (data) this.numberOfQuestion = data;
      this.setState({});
    });

    AsyncStorage.getItem("downloadURI").then((data) => {
      if (data) this.dirname = data;
      this.setState({});
    });
  }
  state = { disableButton: false };

  validateJSON(body) {
    try {
      var data = JSON.parse(body);
      return data;
    } catch (e) {
      return null;
    }
  }

  SaveDir = async () => {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      // Gets SAF URI from response
      const uri = permissions.directoryUri;

      await AsyncStorage.setItem("downloadURI", uri);
      alert("Directory for logs:" + uri);
      this.dirname = uri;
      this.setState({});
    }
  };

  ShareDir = async () => {
    //var filename = "gamelog" + "_" + Date.now() + ".tsv";
    let fileUri = FileSystem.documentDirectory + "/NRCTuring/";
    //setLogs();
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "/NRCTuring/",
      { intermediates: true }
    );
    const UTI = "public.item";
    const shareResult = await Sharing.shareAsync(fileUri, { UTI });
    this.dirname = fileUri;
    this.setState({});
  };

  DeleteDir = async () => {
    //var filename = "gamelog" + "_" + Date.now() + ".tsv";
    let fileUri = FileSystem.documentDirectory + "/NRCTuring/";
    //setLogs();
    await FileSystem.deleteAsync(FileSystem.documentDirectory + "/NRCTuring/", {
      idempotent: true,
    });
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "/NRCTuring/",
      { intermediates: true }
    );
    this.dirname = fileUri;
    this.setState({});
  };

  pickDocument = async () => {
    this.setState({ disableButton: true });
    await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };
        //setDoc(fileToUpload);
        FileSystem.readAsStringAsync(fileToUpload.uri)
          .then((fileResult) => {
            console.log(
              fileResult.substring(1000),
              "...............fileResult"
            );
            console.log(fileToUpload.name, "....fileToUpload.name");
            var data = "ab";
            //this.validateJSON(fileResult);
            if (data) {
              AsyncStorage.setItem("FILE_NAME", fileToUpload.name).then(() => {
                this.name = fileToUpload.name;
              });
              AsyncStorage.setItem("FILE_CONTENT", fileResult).then(() => {
                this.setState({ disableButton: false });
              });
            } else {
              alert("File is not a valid JSON File");
              this.setState({ disableButton: false });
            }
          })
          .catch((error) => {
            console.log(
              "There has been a problem with your fetch operation: " +
                error.message
            );
          });
      }
    });
    // console.log(result);
  };

  onSubmitButton = async (newVal) => {
    if (isNaN(newVal)) {
      alert("Enter only number");
      return;
    }

    this.setState({ val: newVal });
    AsyncStorage.setItem("NO_QUES", newVal).then(() => {
      AsyncStorage.getItem("NO_QUES").then((data) => {
        console.log(data, "...............No. of Questions");
      });
    });
  };

  render() {
    //const { route, navigation } = this.props;

    return (
      <View style={styles.admincontainer}>
        <View>
          <Text style={styles.uploadtext}>Select and Upload File</Text>
          <Pressable style={styles.button2} onPress={this.pickDocument}>
            <View style={{ flexDirection: "row" }}>
              <Fontisto name="upload" size={20} color="#00008b" />
              <Text style={{ color: "#00008b", marginLeft: 5 }}>Upload</Text>
            </View>
          </Pressable>
          <Text>{this.name}</Text>
        </View>
        <Text style={{ color: "#00008b", marginTop: 20 }}>
          Enter number of questions for the game
        </Text>
        <TextInput
          style={styles.admininput}
          keyboardType="numeric"
          placeholder="Number of Questions"
          defaultValue={this.numberOfQuestion + ""}
          onChangeText={(newVal) => {
            this.onSubmitButton(newVal);
          }}
        />

        {Platform.OS === "android" && (
          <Pressable
            style={styles.button1}
            onPress={() => {
              this.SaveDir();
            }}
          >
            <Text style={styles.text} secureTextEntry="true">
              Change Download Directory
            </Text>
          </Pressable>
        )}

        {Platform.OS === "ios" && (
          <Pressable
            style={styles.button1}
            onPress={() => {
              this.ShareDir();
            }}
          >
            <Text style={styles.text} secureTextEntry="true">
              Save Log Directory
            </Text>
          </Pressable>
        )}

        {Platform.OS === "ios" && (
          <Pressable
            style={styles.button1}
            onPress={() => {
              alert("Are you sure you want to delete old logs", [
                {
                  text: "OK",
                  onPress: () => {
                    console.log("OK Pressed");
                    this.DeleteDir();
                  },
                },
                {
                  text: "Cancel",
                  onPress: () => {
                    console.log("Cancel Pressed");
                  },
                },
              ]);
              this.DeleteDir();
            }}
          >
            <Text style={styles.text} secureTextEntry="true">
              Delete Log Directory
            </Text>
          </Pressable>
        )}

        <Pressable
          style={styles.button1}
          disabled={this.state.disableButton}
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        >
          <Text style={styles.text} secureTextEntry="true">
            {this.state.disableButton ? "Please Wait" : "Done"}
          </Text>
        </Pressable>
      </View>
    );
  }
}
