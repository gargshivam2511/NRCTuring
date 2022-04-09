import React, { Component } from "react";
import { Text, View, TextInput, Pressable, TouchableOpacity } from "react-native";
import {DocPicker} from "./DocPicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";

export default class AdminScreen extends Component {
  constructor(props) {
    super(props);
   
  }
  state = {number:''};

  
  render() {
    //const { route, navigation } = this.props;
    
    return (
      <View style={{ marginTop: '40%', padding: 20 }}>         
      <DocPicker/>   
		  <Text  style={{ color: '#00008b',marginTop:20 }}>Enter number of questions for the game</Text>
      <TextInput
          style={styles.admininput}         
          keyboardType="numeric"
          placeholder="Number of Questions"
          onChangeText={(newVal) => this.setState({ val: newVal })}
        />
      
      <Pressable
          style={styles.button1}
          onPress={() => {           
            if (this.state.val <= 0)
              alert("Please enter a value greater than 0");              
            else 
              AsyncStorage.setItem('NO_QUES',this.state.val);
              this.props.navigation.navigate("Admin");
          }}
          
        >
          <Text style={styles.text} secureTextEntry="true">
            Done
          </Text>
        </Pressable>
        
      </View>
    );
  }
}
