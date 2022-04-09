import React, { Component } from "react";
import { Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import {CustomTextInput} from "./CustomTextInput";
import {DocPicker} from "./DocPicker";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";

export default class AdminScreen extends Component {
  constructor(props) {
    super(props);
    this.return_filename()
  }
  state = {};

  return_filename = async () => {
    let filename = await AsyncStorage.getItem('FILE_NAME');
    console.log(filename,'-------------asdfsdf')
  }
  render() {
    //const { route, navigation } = this.props;
    
    return (
      <View style={{ marginTop: '40%', padding: 20 }}>         
      <DocPicker/>   
		  <Text  style={{ color: '#00008b',marginTop:20 }}>Enter number of questions for the game</Text>
		  <CustomTextInput/>
      <Pressable
          style={styles.button1}
          onPress={() => {  
          
          }}
        >
          <Text style={styles.text} secureTextEntry="true">
            Proceed
          </Text>
        </Pressable>
        <Pressable
          style={styles.button1}
          onPress={() => {  
            this.return_filename()
          }}
        >
          <Text style={styles.text} secureTextEntry="true">
            Print
          </Text>
        </Pressable>
      </View>
    );
  }
}
