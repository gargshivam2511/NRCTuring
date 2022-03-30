import React, { Component } from "react";
import { Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import styles from "./styles";

export default class AdminScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const { route, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Admin Screen</Text>
        <Pressable
          style={styles.button}
          onPress={() => {alert("to be built");
          }}
        >
          <Text style={styles.text}>Upload</Text>
        </Pressable>
      </View>
    );
  }
}
