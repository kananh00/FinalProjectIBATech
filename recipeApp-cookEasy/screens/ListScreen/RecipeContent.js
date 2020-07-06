import React from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { RecipesItem } from "./RecipesItem";


export const RecipeContent = ({
  ingredients,image
}) => {
  return (
      <View>
    <Image style={styles.projectCardImg} source={{ uri: image }} />
    <FlatList
      data={ingredients}
      renderItem={({ item }) => (
        <RecipesItem
          {...item}
        />
      )}
    /></View>
  );
};

const styles = StyleSheet.create({
})