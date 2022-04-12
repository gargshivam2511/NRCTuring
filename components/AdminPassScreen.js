import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";

import styles from "./styles";

export default class AdminPassScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route, navigation } = this.props;
    return (
      <View style={{ marginTop: "50%", padding: 20 }}>
        <Text style={{ color: "#00008b" }}>Enter Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.admininput}
          placeholder="Enter Password"
          onChangeText={(newText) => this.setState({ text: newText })}
        />
        <Pressable
          style={styles.button1}
          onPress={() => {
            if (this.state.text == "NRCPASSWORD")
              this.props.navigation.navigate("Admin");
            else alert("Please enter correct password");
          }}
        >
          <Text style={styles.text} secureTextEntry="true">
            Validate
          </Text>
        </Pressable>
      </View>
    );
  }
}
