import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RecipeScreen } from "../screens/RecipeScreen";

import { headerDefaultStyle } from "../styles/headerDefaultStyle";
const { Navigator, Screen } = createStackNavigator();
import { HomeTabs } from "./HomeTabs";

export const HomeStack = () => (
  <Navigator>
    <Screen name="Recipes" component={RecipeScreen} />
  </Navigator>
);
