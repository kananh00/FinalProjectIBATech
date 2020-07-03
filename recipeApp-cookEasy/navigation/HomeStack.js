import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RecipeScreen } from "../screens/RecipeScreen";
// import { ListScreen } from "../screens/ListScreen";
import { headerDefaultStyle } from "../styles/headerDefaultStyle";
const { Navigator, Screen } = createStackNavigator();

export const HomeStack = () => (
    <Navigator  screenOptions={headerDefaultStyle}>
    <Screen
    name="Recipes"
    component={RecipeScreen}
    />
    
    </Navigator>
);
