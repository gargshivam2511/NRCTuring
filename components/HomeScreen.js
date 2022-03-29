import React, { Component } from "react";
import { StyleSheet, Text, View, Button,TouchableOpacity } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  onStart = () => {
    this.props.navigation.navigate("Avatar");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.admin}
        >
          <Text>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onStart}
        >
          <Text>Start Game</Text>
        </TouchableOpacity>
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
  button: {
    
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
