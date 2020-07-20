import React from "react";
import { StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";
import { connect } from "react-redux";

import { RecipesList } from "./RecipeScreen/RecipesList";
import { getRecipes, deleteRecipe } from "../store/data";
import { selectAuthUsername, selectAuthPhoto } from "../store/auth";
import { CustomText } from "../components/CustomText";
import { COLORS } from "../styles/color";
import { HeaderBtn } from "../components/HeaderBtn";
import { getTheme } from "../store/theme";

const mapStateToProps = (state, { route }) => ({
  photo: selectAuthPhoto(state),
  username: selectAuthUsername(state),
  allRecipes: getRecipes(state),
  theme: getTheme(state)
});

export const MyRecipesScreen = connect(mapStateToProps, { deleteRecipe })(
  ({ navigation, allRecipes, deleteRecipe, photo, username, route,theme }) => {
    const deleteHandler = (recipeID, recipeTitle) => {
      Alert.alert(
        "Delete Recipe",
        `Are you sure what you want delete "${recipeTitle}"`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes, delete",
            onPress: () => {
              deleteRecipe({
                recipeID,
              });
            },
          },
        ]
      );
    };
    const checkTheme = () =>{
      if(theme === "dark"){
        return true;
      }
      else  if(theme === "light"){
        return false;
      }
    }
    return (
      <View style={styles.container}>
        <View style={[styles.header,{ backgroundColor : 
         checkTheme() ? COLORS.BG_SIGN_UP : COLORS.PRIMARY,}]}>
          <HeaderBtn onPress={() => navigation.navigate("HomeTabs")} />

          <CustomText style={styles.headertxt} weight="bold">
            My Recipes
          </CustomText>
        </View>
        <View>
          {allRecipes
            .filter((item) => item.username === username)
            .map((item) => (
              <RecipesList
                name={item.name}
                image={item.imageUri}
                portion={item.portion}
                myRecipeMode={true}
                onDeletePress={() => deleteHandler(item.id, item.name)}
                onEditPress={() =>
                  navigation.navigate("List", {
                    addMode: true,
                    recipeID: item.id,
                    title: item.name,
                    desc: item.description,
                    image: item.imageUri,
                    duration: item.duration,
                    portion: item.portion,
                  })
                }
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
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BUTTON_TEXT,
    flex: 1,
  },
  header: {
    // backgroundColor: COLORS.PRIMARY,
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
