import React, { useContext, createContext, useReducer, useState } from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Context from "./context/globalContext";

import mainScreen from "./screens/mainScreen";
import newItemScreen from "./screens/newItemScreen";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <Context>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Home'
          tabBarOptions={{ activeTintColor: "#e91e63" }}
        >
          <Tab.Screen
            name='Home'
            component={mainScreen}
            options={{
              tabBarLabel: "Dashboard",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='home' size={size} color={color} />
              )
            }}
          />
          <Tab.Screen
            name='New'
            component={newItemScreen}
            options={{
              tabBarLabel: "Add Item",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='plus' size={size} color={color} />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Context>
  );
}

export default App;
