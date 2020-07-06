import React, { useState } from "react";
import {Image, StyleSheet, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

import { RecipeContent } from "./RecipeContent";
import { MaterialIcons } from '@expo/vector-icons';
import { ICONS } from '../../styles/icon'
import {GLOBAL_STYLES} from '../../styles/globalStyles';
import {
  selectSingleRecipeByID,
  addIngredient

} from "../../store/data";
import { CustomText } from "../../components/CustomText";
import { COLORS } from "../../styles/color";
import { IngredientForm } from "./IngredientForm";

const mapStateToProps = (state, { route }) => ({
  recipe: selectSingleRecipeByID(
    state,
    route.params?.recipeID,
    
  ),
  
});

export const ListScreen = connect(mapStateToProps, {addIngredient})(
  ({
    route,
    recipe,
    addIngredient
   
   
  }) => {
    const { recipeID, addMode, portion, duration, image, desc, title } = route.params;
    const navigations = useNavigation();
   
    const createDispatchHandler = (methodToDispatch) => (payload = {}) =>
      methodToDispatch({
        recipeID,
        ...payload,
      });

      const addHandler = createDispatchHandler(addIngredient);
    return (
      <ScrollView>
        <View style = {styles.recipeText}>
      <View style = {styles.imgWrapper}>
        <Image style={styles.recipeImg} source={{ uri: image }} />
        <MaterialIcons style = {styles.backArrow} onPress = {navigations.goBack} name="arrow-back" size={35} color="white" />
        
      </View>
      <View style = {styles.content}>
        <View style = {styles.favorite}>
          <Image  style={styles.icons}  source={ICONS.heartEmpty}/>
        </View>
        <View style = {styles.contentWrapper}>
          <CustomText weight = "semi" style = {styles.title}>{title}</CustomText> 
          <View style = {styles.cover}>
            <View style = {styles.row}>

              <View style = {styles.iconWrapper}>
                <Image  style={styles.icons}  source={ICONS.clock}/>
                <CustomText>{duration}</CustomText>
              </View>

              <View style = {styles.iconWrapper}>
                <Image  style={styles.icons}  source={ICONS.dinner}/>
                <CustomText>{portion} person</CustomText> 
              </View>

              <TouchableOpacity>
                <View style = {styles.iconWrapper}>
                  <Image  style={styles.icons}  source={ICONS.eventColored}/>
                  <CustomText>add to wishlist</CustomText> 
                </View>
              </TouchableOpacity>

            </View>
          
          {/* <View style = {styles.row}>  
            <CustomText>{duration}</CustomText>
            <CustomText>{portion} person</CustomText> 
           <TouchableOpacity>
            <CustomText>add to wishlist</CustomText> 
          </TouchableOpacity>
          </View>  */}
          </View>
          <CustomText weight = "semi" style = {styles.text}>How to make it</CustomText> 
          <CustomText  style = {styles.description}>{desc}</CustomText>  
          <CustomText weight = "semi" style = {styles.text}>Ingredients</CustomText> 
        </View>
        {/* {!addMode &&( */}

          {addMode && (
          <IngredientForm
            // singeProductEditState={singeProductEditState}
            addHandler={addHandler}
            // updateProductHandler={updateProductHandler}
            // finishSingleProductEdit={finishSingleProductEdit}
          />
        )}

        <RecipeContent
            ingredients={recipe.ingredients}
          />
          {/* )} */}
        </View>
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
          marginBottom: GLOBAL_STYLES.MARGIN,
      },
      favorite: {
        borderWidth: 4,
        borderColor: "white",
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 100,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 50,
        marginTop: -40,
        marginBottom: 10,
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
    icons:{
        width:30,
        height:30,
        marginBottom: 5,
    },
    contentWrapper:{
    alignItems: "center",
    },
    content: {
      flex: 1,
      marginTop: -30,
      backgroundColor: "white",
      borderTopStartRadius: 40,
      borderTopEndRadius: 40,
      paddingTop: 15,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cover: {
      width: "80%",
    },
    text: {
      fontSize: 22,
      margin: GLOBAL_STYLES.MARGIN,
    },
    description: {
      paddingRight: 15,
      paddingLeft: 15,
    },
    iconWrapper: {
      flexDirection: "column",
      alignItems: "center",
    }
})