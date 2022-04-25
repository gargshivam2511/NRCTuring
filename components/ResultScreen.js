import React, { Component } from "react";
import { Text, View, Image, Pressable, TouchableOpacity} from "react-native";
import styles from "./styles";

import robot from "../assets/robot.png";
import {getHumanScore, getRobotScore, getAvatar} from "./GameScreen";
import saveFile from "./Util";

export default class ResultScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route, navigation } = this.props;
    saveFile();
    return (
      <View style={styles.avatarcontainer}>
        <Text style={styles.resultHeading}>Score</Text>
        <View style={{ flexDirection: "row", padding: 20}}>
          <View style={{ flexDirection: "column", alignItems: "center"}}>
            <Image
              source={getAvatar()}
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
