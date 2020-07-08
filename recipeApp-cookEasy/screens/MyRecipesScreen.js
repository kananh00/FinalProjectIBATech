import React from "react";
import { StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";
import { connect } from "react-redux";


import { RecipesList } from "./RecipeScreen/RecipesList";
import { getRecipes } from "../store/data";
import { selectAuthUsername, selectAuthPhoto } from "../store/auth";
const mapStateToProps = (state, { route }) => ({
  photo: selectAuthPhoto(state),
  username: selectAuthUsername(state),
  allRecipes: getRecipes(
    state,
  ),
});

export const MyRecipesScreen = connect(mapStateToProps)(
  ({ navigation, allRecipes, photo, username, route}) => {

    return (
      <View>
        {allRecipes
          .filter((item) => item.username === username)
          .map((item) => (
            <RecipesList
              name={item.name}
              image = {item.imageUri}
              portion = {item.portion}
              myRecipeMode = {true}
            //   userPhoto = {item.photo}
            
              onPress={() =>
                navigation.navigate("List", {
                  
                  addMode: false,
                  recipeID: item.id,
                  title: item.name,
                  desc: item.description,
                  image: item.imageUri,
                  duration: item.duration,
                  portion: item.portion,
                })

              }

            />
            ))}
     
      </View>
    );
  }
);

const styles = StyleSheet.create({
 

});
