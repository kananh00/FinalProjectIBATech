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
import { selectFavorites, getAndListenFavsList } from "../store/wishAndFav";
import { selectAuthUserID } from "../store/auth";
import { connect } from "react-redux";
import { RecipesList } from "./RecipeScreen/RecipesList";
import { getTheme } from "../store/theme";
const mapStateToProps = (state, { route }) => ({
  favorites: selectFavorites(state),
  userID: selectAuthUserID(state),
  theme: getTheme(state),
});

export const FavList = connect(mapStateToProps, { getAndListenFavsList })(
  ({
    route,
    favorites,
    userID,
    getAndListenFavsList,
    recipe,
    navigation,
    theme,
  }) => {
    const [isDelete, setIsDelete] = useState(false);

    const deleteFav = (title) => {
      fbApp.db.ref(`users/${userID}/favlist/${title}`).remove();
      setIsDelete(true);
    };
    useEffect(() => {
      getAndListenFavsList();
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
            Favourites
          </CustomText>
        </View>
        <View>
          <FlatList
            contentContainerStyle={styles.list}
            data={favorites}
            renderItem={({ item }) => (
              <RecipesList
                favAndWishMode={true}
                name={item.title}
                image={item.image}
                userPhoto={item.photo}
                onCrossPress={() => deleteFav(item.title)}
                onPress={() =>
                  navigation.navigate("List", {
                    addMode: false,
                    isFavorite: true,
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
