import React, { useContext, createContext, useReducer, useState } from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Context from "./context/globalContext";

import mainScreen from "./screens/mainScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={mainScreen}
            options={{
              title: "Dashboard",
              headerTransparent: true,
              headerStyle: {
                backgroundColor: "#0F4C75"
              },
              headerTintColor: "#fff"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
}

export default App;
