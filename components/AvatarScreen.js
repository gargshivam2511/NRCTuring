import React, { Component } from "react";
import { StyleSheet, Text, View, Button,TouchableOpacity,Image } from "react-native";
import man from '../assets/man.png';
import dog from '../assets/dog.png';
import woman from '../assets/woman.png';
 
class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
        pressImage1: false,
        pressImage2: false,
        pressImage: false,
                 
     }
  }
  
  pressImg1 = () =>
  {
      this.setState({
        pressImage1:true,
        pressImage2:false,
        pressImage:false,
        
        
      });
    
  }
  pressImg2 = () =>
  {
      this.setState({
        pressImage2:true,
        pressImage1:false,
        pressImage:false,
        
      });
    
  }

  pressImg = () =>
  {
      this.setState({
        pressImage:true,
        pressImage2:false,
        pressImage1:false,
        
      });
    
  }
  onPlay = () => {
      if (this.state.pressImage1 || this.state.pressImage2 || this.state.pressImage ){
        
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
      <Text style={styles.mainheading}>NRC Turing </Text>
        <Text style={styles.heading}>Pick an Avatar</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.pressImg1}>
              <Image
                source={dog}
                style={[styles.ImageClass1,{borderWidth: this.state.pressImage1?7:0, borderColor: this.state.pressImage1?'red':'coral', borderRadius: this.state.pressImage1?18:0}]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.pressImg}>
              <Image
                source={man}
                style={[styles.ImageClass,{borderWidth: this.state.pressImage?7:0, borderColor: this.state.pressImage?'red':'coral', borderRadius: this.state.pressImage?18:0}]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
          <TouchableOpacity  onPress={this.pressImg2}>
              <Image
                source={woman}
                style={[styles.ImageClass2,{borderWidth: this.state.pressImage2?7:0, borderColor: this.state.pressImage2?'red':'coral', borderRadius: this.state.pressImage2?18:0}]}
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
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "center",
  },
    heading:{
    fontSize:45,
    //fontWeight: 'bold'
  },
  mainheading:{
    fontSize:45,
    fontWeight: 'bold'
  },
  ImageClass1:
  {
    width: 100,
    height: 100,
    justifyContent: 'flex-start',
    padding:12,
    margin:20,
    borderRadius:50
  },
  ImageClass:
  {
    width: 100,
    height: 100,
    justifyContent: 'center',
    padding:12,
    margin:20,
    borderRadius:50
  },
  ImageClass2:
  {
    width: 100,
    height: 100,
    justifyContent: 'flex-end',
    padding:12,
    margin:20,
    borderRadius:50
  },
  button: {
    
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
