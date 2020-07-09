import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CustomText } from "../components/CustomText";
import { BackBtn } from "../components/BackBtn";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../styles/color";
import fbApp from "../firebaseInit";
import { ListScreen } from "./ListScreen";
import { ICONS } from "../styles/icon";
import { selectSingleRecipeByID } from "../store/data";
import { connect } from "react-redux";


const mapStateToProps = (state, { route }) => ({
  recipe: selectSingleRecipeByID(state, route.params?.recipeID),
});

export const FavList = connect(mapStateToProps, {
    selectSingleRecipeByID,
  })(({ route, recipe, selectSingleRecipeByID, navigation }) => {
    const { recipeID, image, title } = route.params;
    const [isDelete, setIsDelete] = useState(false);

  const deleteFav = () => {
    fbApp.db.ref(`favlist/${title}`).remove();
    setIsDelete(true);

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackBtn onPress={() => navigation.navigate("HomeStack")} />

        <CustomText weight="bold" style={styles.headertxt}>
          Favourites
        </CustomText>
        <Image style={styles.Icon} source={ICONS.heart} />
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={styles.fields}>
          <Image style={styles.img} source={{ uri: image }} />
          <CustomText weight="semi">{title}</CustomText>

          <TouchableOpacity
            onPress={deleteFav}
            style={styles.deleteIconWrapper}
          > 
          <Image style={styles.Icon} source={ICONS.deleteIcon} />
           
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});
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
    // paddingHorizontal:"100%",
    paddingVertical: 30,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  headertxt: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 30,
    paddingHorizontal: 20,
  },
  fields: {
    flexDirection: "row",
    borderWidth: 3,
    borderColor: COLORS.PRIMARY,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "space-around",
    backgroundColor: "#F4F8FC",
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  img: {
    borderRadius: 20,
    borderWidth: 4,
    width: 90,
    height: 90,
    borderColor: COLORS.PRIMARY,
  },
  Icon: {
    width: 25,
    height: 25,
  },
  deleteIconWrapper: {
    backgroundColor: COLORS.PRIMARY,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
