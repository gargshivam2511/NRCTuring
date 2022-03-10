import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>Game Home Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
