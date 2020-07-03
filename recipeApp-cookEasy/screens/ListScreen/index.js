import React, { useState } from "react";
import {Image, StyleSheet, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

import { RecipeContent } from "./RecipeContent";
import { MaterialIcons } from '@expo/vector-icons';

import {
  selectSingleRecipeByID,

} from "../../store/data";
import { CustomText } from "../../components/CustomText";

const mapStateToProps = (state, { route }) => ({
  recipe: selectSingleRecipeByID(
    state,
    route.params?.recipeID,
    
  ),
  
});

export const ListScreen = connect(mapStateToProps)(
  ({
    route,
    recipe,
   
   
  }) => {
    const { recipeID, portion, duration, image, desc, title } = route.params;
    const navigations = useNavigation();
   
    return (
      <ScrollView>
      <View style = {styles.imgWrapper}>
        <Image style={styles.recipeImg} source={{ uri: image }} />
        <MaterialIcons style = {styles.backArrow} onPress = {navigations.goBack} name="arrow-back" size={35} color="white" />
        
      </View>
      <View style = {styles.contentWrapper}>
        <CustomText weight = "semi" style = {styles.title}>{title}</CustomText> 
        <View style = {styles.cover}>
        <View style = {styles.row}>
          <CustomText>{duration}</CustomText>
          <CustomText>{portion} person</CustomText> 
          <CustomText>add to wishlist</CustomText> 
        </View> 
        </View>
        <CustomText>{desc}</CustomText>  
        <RecipeContent
          ingredients={recipe.ingredients}
        />
      </View>
      </ScrollView>
    );
  }
);
const styles = StyleSheet.create({
    recipeImg: {
        ...StyleSheet.absoluteFill,
      },
      title: {
          color: "black",
          fontSize: 30,
          justifyContent: "center",
          textAlign: "center",
      },
      imgWrapper: 
      {
        width: "100%",
        height: 250,
        padding: 15,
      },
    backArrow: {
        marginTop: 20,
    },
    contentWrapper:{
    marginTop: -30,
    backgroundColor: "white",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingTop: 15,
    alignItems: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cover: {
      width: "80%",
    }
})