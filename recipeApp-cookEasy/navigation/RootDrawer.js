import React from "react";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { CustomDrawer } from "../components/CustomDrawer";
import { WelcomeScreen, Login, SignUp, CreateRecipe, MyRecipesScreen  } from "../screens";
import { RecipeScreen } from "../screens/RecipeScreen";
import { UserSettings } from "../screens/SettingsScreen/UserSettings";
import { ICONS } from "../styles/icon";
import { BackBtn } from "../components/BackBtn";
import { HomeStack } from "./HomeStack";
import { ListScreen } from "../screens/ListScreen";
import {
  selectAuthStatus,
  selectAuthUsername,
  selectAuthPhoto,
  setAuthStatus,
} from "../store/auth";
import { connect } from "react-redux";
import { HomeTabs } from "./HomeTabs";
import { AuthStack } from "./AuthStack";
import { WishList } from "../screens/WishList";
import { FavList } from "../screens/FavList";

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
          {auth ? (
            <>
              <Screen name="HomeTabs" component={HomeTabs} />
              <Screen name="List" component={ListScreen} />
              <Screen name="UserSettings" component={UserSettings} />
              <Screen name="Create" component={CreateRecipe} />
              <Screen name="MyRecipes" component={MyRecipesScreen} />
              <Screen name="WishList" component={WishList} />
              <Screen name="FavList" component={FavList} />
              <Screen name="HomeStack" component={RecipeScreen} />

            </>
          ) : (
              <Screen
              options={{ swipeEnabled: false }}
              name="AuthStack" component={AuthStack} />
            )}
        </Navigator>
      </NavigationContainer>
    );
  }
);