import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { headerDefaultStyle } from "../styles/headerDefaultStyle";
import {CreateRecipe } from '../screens';
import { RecipeScreen } from "../screens/RecipeScreen"; 
import {UserSettings} from '../screens/SettingsScreen/UserSettings';
import { HomeStack } from "./HomeStack";
import {COLORS} from '../styles/color';




const { Navigator, Screen } = createBottomTabNavigator();

export const HomeTabs = () => (
  <Navigator
  tabBarOptions={
    { showLabel: false,
      style: {
    backgroundColor: COLORS.PRIMARY,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // paddingTop: 15,
    height: 60,
}}

}

  screenOptions={headerDefaultStyle, ({ route }) => ({
    
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = null;
      if (route.name === "HomeStack") {
        iconName = "home";
      } 
      else if (route.name === "Create") {
        iconName = "plus-circle";
        size = 40;
        
      }
      else if (route.name === "UserSettings") {
        iconName = "user-alt";
        
      }
      return <FontAwesome5 name={iconName} color={focused ? COLORS.CREATE_ACCOUNT_COLOR : "white"} size={size} />
      ;
    },
  })}

  >
    {/* <Screen name="AllChats">
      {({ ...props }) => <ChatsListScreen type="all" {...props} />}
    </Screen>
    <Screen name="PrivateChats">
      {({ ...props }) => <ChatsListScreen type="private" {...props} />}
    </Screen> */}
    <Screen name="HomeStack" component={HomeStack} options={({ navigation }) => ({
        title: '',
      })}/>
    <Screen name="Create" component={CreateRecipe} 
    options={({ navigation }) => ({
        title: '',
      })}/>
       <Screen name="UserSettings" component={UserSettings} 
    options={({ navigation }) => ({
        title: '',
      })}/>
  </Navigator>
);
