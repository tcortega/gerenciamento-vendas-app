import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import UserProvider from "./src/context/User";
import MainStack from "./src/stacks/MainStack";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserProvider>
  );
}
