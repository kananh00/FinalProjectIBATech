import React from "react";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { NavigationContainer } from "@react-navigation/native";
import { CustomDrawer } from '../components/CustomDrawer';
import { HomeScreen, Login, SignUp, CreateRecipe, MyRecipesScreen } from '../screens';
import {UserSettings} from '../screens/SettingsScreen/UserSettings';
import { ICONS } from '../styles/icon'
import { BackBtn } from "../components/BackBtn";
import { HomeStack } from "./HomeStack";
import { ListScreen } from "../screens/ListScreen";
import {
  selectAuthStatus,
  selectAuthUsername,
  selectAuthPhoto,
} from "../store/auth";
import { connect } from "react-redux";
import { HomeTabs } from "./HomeTabs";

const mapStateToProps = (state) => ({
  photo: selectAuthPhoto(state),
  username: selectAuthUsername(state),
  auth: selectAuthStatus(state),
});

const { Navigator, Screen } = createDrawerNavigator();

export const RootDrawer = connect(mapStateToProps)(
  ({ auth, photo, username }) => {
    return (
      <NavigationContainer>
        <Navigator
          drawerContent={(props) => (
            <CustomDrawer {...props} username={username} photo={photo} />
          )}
        >
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
          <Screen name="HomeTabs" component={HomeTabs} />
          <Screen name="List" component={ListScreen} />
          <Screen name="UserSettings" component={UserSettings} />
          <Screen name="Create" component={CreateRecipe} />
          <Screen name="MyRecipes" component={MyRecipesScreen} /> 
            </Navigator>
        </NavigationContainer>
    )
})

            
            

