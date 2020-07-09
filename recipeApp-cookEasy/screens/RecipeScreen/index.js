import React from "react";
import { StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";
import { connect } from "react-redux";


import { RecipesList } from "./RecipesList";
import { getRecipes } from "../../store/data";
// import { selectAuthUsername, selectAuthPhoto } from "../../store/auth";
const mapStateToProps = (state, { route }) => ({
  // photo: selectAuthPhoto(state),
  // username: selectAuthUsername(state),
  allRecipes: getRecipes(
    state,
  ),
});

export const RecipeScreen = connect(mapStateToProps)(
  ({ navigation, allRecipes, username, route}) => {

    return (
      <View>
        <FlatList
          data={allRecipes}
          renderItem={({ item }) => (
            <RecipesList
              name={item.name}
              image = {item.imageUri}
              portion = {item.portion}
              userPhoto = {item.photo}
              myRecipeMode = {false}
              onPress={() =>
                navigation.navigate("List", {
                  addMode: false,
                  recipeID: item.id,
                  title: item.name,
                  desc: item.description,
                  image: item.imageUri,
                  duration: item.duration,
                  portion: item.portion,
                  photo: item.photo
                })

              }

            />
          )}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
 

});
