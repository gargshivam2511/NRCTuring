import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Alert 
} from "react-native";
import man from "../assets/man.png";
import dog from "../assets/dog.png";
import woman from "../assets/woman.png";
import styles from "./styles";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class StartScreen extends Component {
  content = [];
  constructor(props) {
    super(props);
    this.state = {
      pressImage1: false,
      pressImage2: false,
      pressImage: false,
      buttonDisable: true,
    };
    AsyncStorage.getItem("FILE_CONTENT").then((data) => {
      if (data) {
        AsyncStorage.getItem("NO_QUES").then((number) => {
          if (number) {
            var allData = JSON.parse(data);
            var arr = this.getRandomArray(allData.length, number);

            for (let i = 0; i < arr.length; i++) {
              var jsonData = allData[arr[i]];
              var keyRandom = this.getRandomArray(3, 3);
              jsonData["key_human"] = keyRandom[0];
              jsonData["key_neural"] = keyRandom[1];
              jsonData["key_stat"] = keyRandom[2];

              this.content.push(jsonData); 
            }
            this.setState({ buttonDisable: false });
          }
        });
      }
    });
    
  }

  getRandomArray = (upperBound, length) => {
    var arr = [];
    while (arr.length < length) {
      var r = Math.floor(Math.random() * upperBound);
      if (arr.indexOf(r) === -1) {
        arr.push(r);
      }
    }
    return arr;
  }

  componentDidMount() {
    AsyncStorage.getItem("FILE_CONTENT").then((data) => {
      if (data) {
        
      }else{
        Alert.alert(
          "Data Error",
          " The questions file is not loaded.Please contact admin",
          [
            
            { text: "OK", onPress: () => {console.log("OK Pressed");this.props.navigation.navigate("Home");} }
          ]
        );
      }
    });
  }
  
  pressImg1 = () => {
    this.setState({
      pressImage1: true,
      pressImage2: false,
      pressImage: false,
    });
  };
  pressImg2 = () => {
    this.setState({
      pressImage2: true,
      pressImage1: false,
      pressImage: false,
    });
  };

  pressImg = () => {
    this.setState({
      pressImage: true,
      pressImage2: false,
      pressImage1: false,
    });
  };
  onPlay = () => {
    //console.log(this.content, ".... Passed Content");
        if (
      this.state.pressImage1 ||
      this.state.pressImage2 ||
      this.state.pressImage
    ) {
      if (this.state.pressImage1) {
        this.props.navigation.navigate("Game", {
          image: dog,
        });
        this.setState({
          pressImage1: false,
        });
      }
      if (this.state.pressImage2) {
        this.props.navigation.navigate("Game", {
          image: woman,
        });
        this.setState({
          pressImage2: false,
        });
      }
      if (this.state.pressImage) {
        this.props.navigation.navigate("Game", {
          image: man,
          content: this.content,
        });
        this.setState({
          pressImage: false,
        });
      }
      this.checkparameters();
    } else {
      alert("Please select an avatar to continue");
    }
  };
  render() {
    return (
      <View style={styles.avatarcontainer}>
        <Text style={styles.avatarmainheading}>NRC Turing </Text>
        <Text style={styles.avatarheading}>Pick an Avatar</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.pressImg1}>
              <Image
                source={dog}
                style={[
                  styles.avatarImageClass1,
                  {
                    borderWidth: this.state.pressImage1 ? 7 : 0,
                    borderColor: this.state.pressImage1 ? "red" : "coral",
                    borderRadius: this.state.pressImage1 ? 18 : 0,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.pressImg}>
              <Image
                source={man}
                style={[
                  styles.avatarImageClass,
                  {
                    borderWidth: this.state.pressImage ? 7 : 0,
                    borderColor: this.state.pressImage ? "red" : "coral",
                    borderRadius: this.state.pressImage ? 18 : 0,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.pressImg2}>
              <Image
                source={woman}
                style={[
                  styles.avatarImageClass2,
                  {
                    borderWidth: this.state.pressImage2 ? 7 : 0,
                    borderColor: this.state.pressImage2 ? "red" : "coral",
                    borderRadius: this.state.pressImage2 ? 18 : 0,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Pressable
          style={styles.button}
          disabled={this.state.buttonDisable}
          onPress={this.onPlay}
        >
          <Text style={styles.text}>
            {this.state.buttonDisable ? "Please Wait" : "Play"}
          </Text>
        </Pressable>
      </View>
    );
  }
}

export default StartScreen;