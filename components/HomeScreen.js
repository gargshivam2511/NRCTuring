import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          title="Game Screen"
          onPress={() => {
            this.props.navigation.navigate("Game", {
              key: "turing Question 1",
              key2: "Value",
            });
          }}
        ></Button>
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
