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
import { connect } from "react-redux";
import { RecipesList } from "./RecipeScreen/RecipesList";
const mapStateToProps = (state, { route }) => ({
  wishes: selectWishlist(state),
});

export const WishList = connect(mapStateToProps, { getAndListenWishList })(
  ({ route, wishes, getAndListenWishList, recipe, navigation }) => {
    //   const [isDelete, setIsDelete] = useState(false);

    // const deleteFav = () => {
    //   fbApp.db.ref(`favlist/${title}`).remove();
    //   setIsDelete(true);

    // };
    useEffect(() => {
      const unsubscribe = getAndListenWishList();
      return unsubscribe;
    }, []);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
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
    backgroundColor: COLORS.PRIMARY,
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
