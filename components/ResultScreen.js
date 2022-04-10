import React, { Component } from "react";
import { Text, View, Image, Pressable, TouchableOpacity} from "react-native";
import styles from "./styles";

import man from "../assets/man.png";
import robot from "../assets/robot.png";
import {getHumanScore, getRobotScore} from "./GameScreen";

export default class ResultScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route, navigation } = this.props;
    return (
      <View style={styles.avatarcontainer}>
        <Text style={styles.avatarmainheading}>Score</Text>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", alignItems: "center"}}>
            <Image
              source={man}
              style={styles.resultImageClass}
            />
            <Text style={styles.resultText}>You</Text>
            <Text style={styles.resultScore}>{getHumanScore()}</Text>
          </View>

          <View style={{ flexDirection: "column", alignItems: "center"}}>
            <Image
              source={robot}
              style={styles.resultImageClass}
            />
            <Text style={styles.resultText}>Robot</Text>
            <Text style={styles.resultScore}>{getRobotScore()}</Text>
           </View>
        </View>
      
        
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
