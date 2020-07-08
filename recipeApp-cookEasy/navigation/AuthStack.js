import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RecipeScreen } from "../screens/RecipeScreen";

import { headerDefaultStyle } from "../styles/headerDefaultStyle";
import { HomeTabs } from "./HomeTabs";
import { SignUp, Login, HomeScreen } from "../screens";
const { Navigator, Screen } = createStackNavigator();

export const AuthStack = () => (
    <Navigator headerMode="none">
        <Screen
            options={{ swipeEnabled: false }}
            name={"HOMEPAGE"}
            component={HomeScreen}
        />
        <Screen
            name={"LOGINPAGE"}
            component={Login}
            options={{ swipeEnabled: false }}
        />
        <Screen
            name={"SIGNUPPAGE"}
            component={SignUp}
            options={{ swipeEnabled: false }}
        />
    </Navigator>
);