import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OptionsList from "./components/options/OptionsList";
import CategoryList from "./components/options/CategoryList";
import LanguageOptionsPanel from "./components/options/LanguageOptionsPanel.js";
import AboutPanel from "./components/options/AboutPanel";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode={"screen"} initialRouteName={"Options"}>
      <Stack.Screen name='Options' component={OptionsList} />
      <Stack.Screen name='Categories' component={CategoryList} />
      <Stack.Screen name='Language' component={LanguageOptionsPanel} />
      <Stack.Screen name='About' component={AboutPanel} />
    </Stack.Navigator>
  );
}

export default MyStack;
