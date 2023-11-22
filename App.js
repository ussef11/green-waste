import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./home/home.js";
import Setting from "./home/setting.js";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const [firsttime, setfirsttime] = useState(true);
  const Stack = createNativeStackNavigator();


  // const CheckFirsttime = async () => {
  //   try {
  //     const firstTime = await AsyncStorage.getItem("isFirstTime");
  //     if (firstTime !== null) {
  //       setfirsttime(false);
  //     } else {
  //       setfirsttime(true);
  //       // Uncomment the line below if you want to set "isFirstTime" in AsyncStorage
  //       // await AsyncStorage.setItem("isFirstTime", 'true');
  //     }
  //   } catch (error) {
  //     console.error("Error reading AsyncStorage:", error);
  //   }
  // };

  // useEffect(() => {
  //   CheckFirsttime();
  // }, []);

  return (
    <NavigationContainer>
    <Stack.Navigator  initialRouteName={firsttime ? 'Home' : 'Home'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  </NavigationContainer>
  )

  // return <>{
  //   firsttime ? <Setting /> : <Home />
  //   }</>;
}
