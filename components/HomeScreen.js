import React, { Component } from "react";
import { Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import styles from "./styles";
//import csv from "csvtojson";
//import * as file from "../sample.csv";
//import * as RNFS from "react-native-fs";
import dog from "../assets/dog.png";
import utils from "./Util";

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
        <Pressable
          style={styles.button}
          onPress={() => {
            // console.log(file);
            //const csvFilePath = "../sample.csv";
            // csv()
            //   .fromFile(csvFilePath)
            //   .on("json", (jsonObj) => {
            //     // combine csv header row and csv line to a json object
            //     // jsonObj.a ==> 1 or 4
            //     console.log(jsonObj);
            //   })
            //   .on("done", (error) => {
            //     console.log("end");
            //   });
            //var file = RNFS.readFile("../sample.csv", "ascii");
            this.props.navigation.navigate("Avatar");
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
