import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";

import styles from "./styles";

export default class AdminPassScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const { route, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Enter Admin Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password"
        />
        <Pressable style={styles.button} onPress="">
          <Text style={styles.text} secureTextEntry="true">
            Validate
          </Text>
        </Pressable>
      </View>
    );
  }
}
