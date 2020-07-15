import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import { CustomText } from "../../components/CustomText";
import { RecipesList } from "./RecipesList";
import { getRecipes } from "../../store/data";
import { COLORS } from "../../styles/color";

const mapStateToProps = (state, { route }) => ({
  allRecipes: getRecipes(state),
});

export const RecipeScreen = connect(mapStateToProps)(
  ({ navigation, allRecipes, username, route }) => {
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.row}>
            <CustomText weight="bold" style={styles.headertxt}>
              Recipes
            </CustomText>
            <View style={{ left: "180%" }}>
              <FontAwesome
                onPress={navigation.openDrawer}
                name="bars"
                size={30}
                color="white"
              />
            </View>
          </View>
        </View>
        <ScrollView>
          <FlatList
            data={allRecipes}
            renderItem={({ item }) => (
              <RecipesList
                name={item.name}
                image={item.imageUri}
                portion={item.portion}
                userPhoto={item.photo}
                myRecipeMode={false}
                favAndWishMode={false}
                onPress={() =>
                  navigation.navigate("List", {
                    addMode: false,
                    recipeID: item.id,
                    title: item.name,
                    desc: item.description,
                    image: item.imageUri,
                    duration: item.duration,
                    portion: item.portion,
                    photo: item.photo,
                  })
                }
              />
            )}
          />
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
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
  },
  headertxt: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 25,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
