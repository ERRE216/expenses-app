import React, { useContext, createContext, useReducer, useState } from "react";
import { Button, View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import Context from "./context/globalContext";

import mainScreen from "./screens/mainScreen";
import ListScreen from "./screens/ListScreen";
import newItemScreen from "./screens/newItemScreen";
import OptionScreen from "./screens/OptionsScreen";

const Tab = createBottomTabNavigator();

function App() {
  const [loaded] = useFonts({
    "Roboto-Black": {
      uri: require("./assets/fonts/Roboto-Black.ttf"),
    },
    "Roboto-Bold": {
      uri: require("./assets/fonts/Roboto-Bold.ttf"),
    },
    "Roboto-Regular": {
      uri: require("./assets/fonts/Roboto-Regular.ttf"),
    },
    "Roboto-Thin": {
      uri: require("./assets/fonts/Roboto-Thin.ttf"),
    },
    "Roboto-Medium": {
      uri: require("./assets/fonts/Roboto-Medium.ttf"),
    },
    "Roboto-Light": {
      uri: require("./assets/fonts/Roboto-Light.ttf"),
    },
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={"white"} />
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
                  <MaterialCommunityIcons
                    name='chart-pie'
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name='List'
              component={ListScreen}
              options={{
                tabBarLabel: "List",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name='clipboard-list'
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name='New'
              component={newItemScreen}
              options={{
                tabBarLabel: "Add Item",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name='plus'
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name='Options'
              component={OptionScreen}
              options={{
                tabBarLabel: "Options",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name='cog'
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Context>
    </>
  );
}

export default App;
