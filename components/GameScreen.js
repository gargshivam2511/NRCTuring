import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
export default class GameScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const { route, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Game Screen</Text>
        <Text>{route.params.key}</Text>
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
