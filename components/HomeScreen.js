import React, { Component } from "react";
import { Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import styles from "./styles";

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
