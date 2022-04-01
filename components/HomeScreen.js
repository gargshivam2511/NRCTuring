import React, { Component } from "react";
import { Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import styles from "./styles";
//import * as RNFS from "react-native-fs";
import * as file from "../csvjson.json";
import dog from "../assets/dog.png";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <View style={styles.avatarcontainer}>
        <Image
          source={dog}
          style={[
            styles.avatarImageClass1,
            {
              borderWidth: 0,
              borderColor: "coral",
              borderRadius: 0,
            },
          ]}
        />
        <Text style={styles.avatarmainheading}>NRC Canada</Text>
        <Text>Home Screen</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("Avatar");
            //import csvFilePath from "../samplefr2enall.tsv";
            // var Papa = require("papaparse/papaparse.min.js");
            // Papa.parse(csvFilePath, {
            //   header: true,
            //   download: true,
            //   skipEmptyLines: true,
            //   //delimiter: "\t",
            //   // Here this is also available. So we can call our custom class method
            //   complete: function (results, file) {
            //     console.log("Parsing complete:", results, file);
            //   },
            // });
            //console.log("file:", file);
            // var obj = JSON.parse(file);
            //console.log(file[0]["trans_human"]);
            //var RNFS = require("react-native-fs");
            //console.log(RNFS);
            // RNFS.readFile("../samplefr2enall.tsv")
            //   .then((result) => {
            //     console.log("file contents", result);
            //   })
            //   .catch((err) => {
            //     console.log(err.message, err.code);
            //   });
            console.log("hello!");
          }}
        >
          <Text style={styles.text}>Start Game</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("AdminPass", {
              key: "turing Question 1",
              key2: "Value",
            });
          }}
        >
          <Text style={styles.text}>Admin</Text>
        </Pressable>
      </View>
    );
  }
}
