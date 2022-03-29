import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import styles from "./styles";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("Game", {
              Question: "turing Question 1",
              Choice1: "1st Option",
              Choice2: "2nd Option",
              Choice3: "3rd Option",
            });
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
