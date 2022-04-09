import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export const CustomTextInput = () => {  
  const [number, onChangeNumber] = React.useState(null);
  return (
    <SafeAreaView>      
      <TextInput
        style={styles.admininput}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Number of Questions"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};


