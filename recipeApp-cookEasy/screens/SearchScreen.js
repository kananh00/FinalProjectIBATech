import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { connect } from "react-redux";

import { RecipesList } from "./RecipeScreen/RecipesList";
import { getRecipes, deleteRecipe } from "../store/data";
import { selectAuthUsername, selectAuthPhoto } from "../store/auth";
import { widthByPercent } from "../utils/widthByPercent";
import { CustomText } from "../components/CustomText";
import { CustomField } from "../components/CustomField";
import { COLORS } from "../styles/color";
import { HeaderBtn } from "../components/HeaderBtn";
import { getTheme } from "../store/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ICONS } from "../styles/icon";
import { GLOBAL_STYLES } from "../styles/globalStyles";
const mapStateToProps = (state, { route }) => ({
  photo: selectAuthPhoto(state),
  username: selectAuthUsername(state),
  allRecipes: getRecipes(state),
  theme: getTheme(state),
});
const fieldInitialState = {
  recipeName: "",
};

export const SearchScreen = connect(mapStateToProps, { deleteRecipe })(
  ({ navigation, allRecipes, deleteRecipe, photo, username, route, theme }) => {
    const checkTheme = () => {
      if (theme === "dark") {
        return true;
      } else if (theme === "light") {
        return false;
      }
    };
    const [fields, setFields] = useState(fieldInitialState);
    const fieldChangeHandler = (name, value) => {
      setFields((fields) => ({
        ...fields,
        [name]: value,
      }));
    };
    let searchMode = false;

    if (fields.recipeName.trim() !== "") {
      searchMode = true;
    }
    const onCancelPress = () => {
      setFields(fieldInitialState);
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
          <View style={styles.headerPart}>
            <HeaderBtn onPress={() => navigation.navigate("HomeTabs")} />
            <CustomText style={styles.headertxt} weight="bold">
              Search Recipe
            </CustomText>
          </View>
          <View style={styles.row}>
            <CustomField
              numberOfLines={1}
              value={fields.recipeName}
              onChangeText={(value) => fieldChangeHandler("recipeName", value)}
              style={styles.searchBar}
              contentContainerStyle={{ width: widthByPercent(95, 3) }}
            />
            {searchMode && (
              <TouchableOpacity onPress={onCancelPress}>
                <View style={styles.iconWrapper}>
                  <Image style={styles.imgs} source={ICONS.close} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          {allRecipes
            .filter((item) => item.name === fields.recipeName)
            .map((item) => (
              <RecipesList
                name={item.name}
                image={item.imageUri}
                portion={item.portion}
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
    elevation: 0,
    shadowOpacity: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingVertical: 20,
    paddingTop: 30,
  },
  headerPart: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  headertxt: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 25,
    paddingHorizontal: 20,
  },
  searchBar: {
    marginLeft: GLOBAL_STYLES.MARGIN,
    marginRight: GLOBAL_STYLES.MARGIN,
  },
  imgs: {
    height: 20,
    width: 20,
  },
  iconWrapper: {
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: COLORS.CREATE_ACCOUNT_COLOR,
    padding: 9,
    borderRadius: 100,
    marginRight: GLOBAL_STYLES.MARGIN,
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
