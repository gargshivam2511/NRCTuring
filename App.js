import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, BackHandler, Alert } from "react-native";

import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";
import AvatarScreen from "./components/AvatarScreen";
import AdminPassScreen from "./components/AdminPassScreen";
import AdminScreen from "./components/AdminScreen";
import ResultScreen from "./components/ResultScreen";

const Stack = createStackNavigator();
export default function App() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        ></Stack.Screen>
        <Stack.Screen name="Avatar" component={AvatarScreen}></Stack.Screen>
        <Stack.Screen name="Game" component={GameScreen}></Stack.Screen>
        <Stack.Screen name="Admin" component={AdminScreen}
         options={{
          title: 'Admin Questionnaire',
          headerStyle: {
            backgroundColor: '#FF3333',             
            height:100
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        ></Stack.Screen>
        <Stack.Screen name="Result" component={ResultScreen}></Stack.Screen>
        <Stack.Screen
         
          name="AdminPass"
          component={AdminPassScreen}
          options={{
            title: 'Admin Password',
            headerStyle: {
              backgroundColor: '#FF3333',             
              height:100
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
