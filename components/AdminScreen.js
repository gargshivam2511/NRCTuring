import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default class AdminScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    answers: [],
    key: 6,
  };
  render() {
    const { route, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Admin Screen</Text>
      </View>
    );
  }
}
