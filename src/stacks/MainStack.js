import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MainDrawer from "./MainDrawer";

import HeaderShownProvider from "../context/HeaderShown";

const RootStack = createStackNavigator();

export default ({ navigation }) => {
  return (
    <HeaderShownProvider>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <RootStack.Screen name="DrawerScreen" component={MainDrawer} />
      </RootStack.Navigator>
    </HeaderShownProvider>
  );
};
