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
            name={"HOMEPAGE"}
            component={HomeScreen}
        />
        <Screen
            name={"LOGINPAGE"}
            component={Login}
        />
        <Screen
            name={"SIGNUPPAGE"}
            component={SignUp}

        />
    </Navigator>
);