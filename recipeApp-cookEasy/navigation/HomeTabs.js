import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import { headerDefaultStyle } from "../styles/headerDefaultStyle";
import { CreateRecipe } from "../screens";
import { RecipeScreen } from "../screens/RecipeScreen";
import { UserSettings } from "../screens/SettingsScreen/UserSettings";
import { COLORS } from "../styles/color";
import { connect } from "react-redux";
import { getTheme } from "../store/theme";

const { Navigator, Screen } = createBottomTabNavigator();

const mapStateToProps = (state) => ({
  theme: getTheme(state)
});

export const HomeTabs = connect(mapStateToProps)((theme,getTheme) => (

  <Navigator
    tabBarOptions={{
      showLabel: false,
      style: {
        // backgroundColor : 
        // checkTheme() ? COLORS.BG_LOGIN : COLORS.PRIMARY,
        backgroundColor: COLORS.PRIMARY,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: 60,
        // marginTop: -20,
      },
    }}
    screenOptions={
      (headerDefaultStyle,
      ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = null;
          if (route.name === "HomeStack") {
            iconName = "home";
          } else if (route.name === "Create") {
            iconName = "plus-circle";
            size = 40;
          } else if (route.name === "UserSettings") {
            iconName = "user-alt";
          }
          
          return (
            <FontAwesome5
              name={iconName}
              color={focused ? COLORS.CREATE_ACCOUNT_COLOR : "white"}
              size={size}
            />
          );
        },
      }))
    }
  >
    <Screen
      name="HomeStack"
      component={RecipeScreen}
      options={({ navigation }) => ({
        title: "",
      })}
    />
    <Screen
      name="Create"
      component={CreateRecipe}
      options={({ navigation }) => ({
        title: "",
      })}
    />
    <Screen
      name="UserSettings"
      component={UserSettings}
      options={({ navigation }) => ({
        title: "",
      })}
    />
  </Navigator>
))
const checkTheme = () =>{
  if(theme === "dark"){
    return true;
  }
  else  if(theme === "light"){
    return false;
  }
};
