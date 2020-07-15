import React from "react";
import {
  StyleSheet,
  Text,
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

export const CustomDrawer = connect(null, { logOut })(
  ({ navigation, username, photo, logOut }) => {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.upperpart}>
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
          <View style={styles.lists}>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyRecipes")}
              style={[styles.drawerlist, styles.addlistbtn]}
            >
              <Image style={styles.imgs} source={ICONS.cookbook} />
              <CustomText style={styles.listtext}>my recipes</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("WishList")}
              style={styles.drawerlist}
            >
              <Image style={styles.imgs} source={ICONS.list} />
              <CustomText style={styles.listtext}>wishlist</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("FavList")}
              style={styles.drawerlist}
            >
              <Image style={styles.imgs} source={ICONS.heart} />
              <CustomText style={styles.listtext}>favorites</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerlist}
              onPress={() => navigation.navigate("UserSettings")}
            >
              <Image style={styles.imgs} source={ICONS.settings} />
              <CustomText style={styles.listtext}>settings</CustomText>
            </TouchableOpacity>

            <TouchableOpacity onPress={logOut} style={styles.logoutbtn}>
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
    marginBottom: "15%",
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
    backgroundColor: COLORS.DRAWER_MENU,
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
    backgroundColor: COLORS.CREATE_ACCOUNT_COLOR,
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
});
