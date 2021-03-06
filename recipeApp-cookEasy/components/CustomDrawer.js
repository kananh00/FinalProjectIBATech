import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { connect } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { CustomText } from "./CustomText";
import { GLOBAL_STYLES } from "../styles/globalStyles";
import { ICONS } from "../styles/icon";
import { IMAGES } from "../styles/images";
import { logOut } from "../store/auth";
import { COLORS } from "../styles/color";
import { getTheme, setTheme } from "../store/theme";
import { Toggle } from "@ui-kitten/components";

const mapStateToProps = (state) => ({
  theme: getTheme(state),
});
export const CustomDrawer = connect(mapStateToProps, { setTheme, logOut })(
  ({ navigation, username, photo, logOut, theme, setTheme }) => {
    const themeHandler = (val) => {
      if (val) setTheme("dark");
      else setTheme("light");

      console.log(theme);
    };

    const checkTheme = () => {
      if (theme === "dark") {
        return true;
      } else if (theme === "light") {
        return false;
      }
    };
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={[
              styles.upperpart,
              {
                backgroundColor: checkTheme()
                  ? COLORS.GREEN
                  : COLORS.DRAWER_MENU,
              },
            ]}
          >
            <CustomText weight="bold" style={styles.drawertxt}>
              cookEasy
            </CustomText>
            <Image
              style={styles.userimg}
              source={photo ? { uri: photo } : IMAGES.avatar}
            />
            <CustomText weight="semi" style={styles.username}>
              {username}
            </CustomText>
          </View>
          <CustomText weight="bold" style={{ textAlign: "center" }}>
            Change Theme
          </CustomText>
          <View style={styles.changetheme}>
            <CustomText>
              {theme === "light" ? "Yellow theme" : "Blue theme"}
            </CustomText>
            <Toggle
              checked={theme === "dark" ? true : false}
              onChange={themeHandler}
              style={{ marginLeft: 10 }}
            />
          </View>
          <View style={styles.lists}>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyRecipes")}
              style={[
                styles.drawerlist,
                {
                  backgroundColor: checkTheme()
                    ? COLORS.GREEN
                    : COLORS.DRAWER_MENU,
                },
              ]}
            >
              <Image style={styles.imgs} source={ICONS.cookbook} />
              <CustomText style={styles.listtext}>my recipes</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("WishList")}
              style={[
                styles.drawerlist,
                {
                  backgroundColor: checkTheme()
                    ? COLORS.GREEN
                    : COLORS.DRAWER_MENU,
                },
              ]}
            >
              <Image style={styles.imgs} source={ICONS.list} />
              <CustomText style={styles.listtext}>wishlist</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("FavList")}
              style={[
                styles.drawerlist,
                {
                  backgroundColor: checkTheme()
                    ? COLORS.GREEN
                    : COLORS.DRAWER_MENU,
                },
              ]}
            >
              <Image style={styles.imgs} source={ICONS.heart} />
              <CustomText style={styles.listtext}>favorites</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.drawerlist,
                {
                  backgroundColor: checkTheme()
                    ? COLORS.GREEN
                    : COLORS.DRAWER_MENU,
                },
              ]}
              onPress={() => navigation.navigate("Search")}
            >
              <Image style={styles.imgs} source={ICONS.search} />
              <CustomText style={styles.listtext}>search</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={logOut}
              style={[
                styles.logoutbtn,
                {
                  backgroundColor: checkTheme()
                    ? COLORS.PURPLE_BTN
                    : COLORS.CREATE_ACCOUNT_COLOR,
                },
              ]}
            >
              <CustomText weight="semi" style={styles.listtext}>
                LOG OUT
              </CustomText>
              <Image style={styles.imgs} source={ICONS.logout} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperpart: {
    backgroundColor: COLORS.DRAWER_MENU,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: "5%",
  },

  drawertxt: {
    fontSize: 45,
    color: "white",
    fontWeight: "bold",
  },
  userimg: {
    width: 100,
    height: 100,
    marginVertical: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 50,
  },
  username: {
    color: "white",
    fontSize: 30,
  },
  drawerlist: {
    marginBottom: 16,
    height: 44,
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listtext: {
    color: "white",
    fontSize: 20,
    marginRight: 30,
  },
  logoutbtn: {
    flexDirection: "row",
    marginHorizontal: 20,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: GLOBAL_STYLES.MARGIN,
    paddingLeft: 50,
    paddingRight: 20,
  },
  imgs: {
    width: 30,
    height: 30,
    marginLeft: 25,
  },
  changetheme: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 15,
  },
});
