import React, { Component } from "react";
import { Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import styles from "./styles";

export default class ResultScreen extends Component {
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
      <View style={styles.avatarcontainer}>
        <Text>Your Score:{}</Text>
        <Text>Robot's Score:{}</Text>
        
        <Pressable
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("Avatar");
          }}
        >
          <Text style={styles.text}>End Game</Text>
        </Pressable>
      </View>
    );
  }
}
