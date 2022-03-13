import React, { Component } from "react";
import { StyleSheet, Text, View, Button,TouchableOpacity,Image } from "react-native";
class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
        pressImage1: false,
        pressImage2: false,
        opacityValue1:1,
        opacityValue2:1
     }
  }
  
  pressImg1 = () =>
  {
      this.setState({
        pressImage1:true,
        opacityValue1:0.6
      });
    
  }
  pressImg2 = () =>
  {
      this.setState({
        pressImage2:true,
        opacityValue2:0.6
      });
    
  }
  onPlay = () => {
      if (this.state.pressImage1 || this.state.pressImage2){
    this.props.navigation.navigate("Game", {
      key: "turing Question 1",
      key2: "Value",
    });
}else{
    alert("Please select an avatar to continue");
}
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Start Screen</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.pressImg1}>
              <Image
                source={{uri:"https://picsum.photos/id/237/200/300.jpg"}}
                style={[styles.ImageClass,{opacity: this.state.opacityValue1}]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
          <TouchableOpacity  onPress={this.pressImg2}>
              <Image
                source={{uri:"https://picsum.photos/id/1/200/300.jpg"}}
                style={[styles.ImageClass2,{opacity: this.state.opacityValue2}]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onPlay}>
          <Text>Play</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default StartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ImageClass:
  {
    width: 100,
    height: 100,
    justifyContent: 'flex-start',
    padding:12,
    margin:20
  },
  ImageClass2:
  {
    width: 100,
    height: 100,
    justifyContent: 'flex-end',
    padding:12,
    margin:20
  },
  button: {
    
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
