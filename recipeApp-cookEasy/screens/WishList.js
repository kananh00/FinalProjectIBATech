import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CustomText } from "../components/CustomText";
import { HeaderBtn } from "../components/HeaderBtn";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../styles/color";
import fbApp from "../firebaseInit";
import { ListScreen } from "./ListScreen";
import { ICONS } from "../styles/icon";
import { selectWishlist, getAndListenWishList } from "../store/wishAndFav";
import { selectAuthUserID } from "../store/auth";
import { connect } from "react-redux";
import { RecipesList } from "./RecipeScreen/RecipesList";
import { getTheme } from "../store/theme";
const mapStateToProps = (state, { route }) => ({
  wishes: selectWishlist(state),
  userID: selectAuthUserID(state),
  theme: getTheme(state),
});

export const WishList = connect(mapStateToProps, { getAndListenWishList })(
  ({
    route,
    wishes,
    userID,
    getAndListenWishList,
    recipe,
    navigation,
    theme,
  }) => {
    const [isDelete, setIsDelete] = useState(false);
    const deleteWished = (title) => {
      fbApp.db.ref(`users/${userID}/wishlist/${title}`).remove();
      setIsDelete(true);
    };

    useEffect(() => {
      const unsubscribe = getAndListenWishList();
      return unsubscribe;
    }, []);

    const checkTheme = () => {
      if (theme === "dark") {
        return true;
      } else if (theme === "light") {
        return false;
      }
    };

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: checkTheme()
                ? COLORS.BG_SIGN_UP
                : COLORS.PRIMARY,
            },
          ]}
        >
          <HeaderBtn onPress={() => navigation.navigate("HomeTabs")} />
          <CustomText weight="bold" style={styles.headertxt}>
            My Wishlist
          </CustomText>
        </View>
        <View>
          <FlatList
            contentContainerStyle={styles.list}
            data={wishes}
            renderItem={({ item }) => (
              <RecipesList
                favAndWishMode={true}
                name={item.title}
                image={item.image}
                userPhoto={item.photo}
                onCrossPress={() => deleteWished(item.title)}
                onPress={() =>
                  navigation.navigate("List", {
                    addMode: false,
                    isWished: true,
                    recipeID: item.recipeID,
                    title: item.title,
                    desc: item.desc,
                    image: item.image,
                    duration: item.duration,
                    durationType: item.durationType,
                    portion: item.portion,
                    photo: item.photo,
                  })
                }
              />
            )}
          />
        </View>
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BUTTON_TEXT,
  },
  header: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    paddingVertical: 20,
    paddingTop: 30,
    alignItems: "center",
    flexDirection: "row",
  },
  headertxt: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 25,
    paddingHorizontal: 20,
  },
});
