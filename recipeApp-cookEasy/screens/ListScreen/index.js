import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { RecipeContent } from "./RecipeContent";
import { MaterialIcons } from "@expo/vector-icons";
import { ICONS } from "../../styles/icon";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import {
  selectSingleRecipeByID,
  addIngredient,
  updateIngredient,
} from "../../store/data";
import { selectFavorites, selectWishlist, getAndListenFavsList } from "../../store/wishAndFav";
import { CustomText } from "../../components/CustomText";
import { COLORS } from "../../styles/color";
import { IngredientForm } from "./IngredientForm";
import fbApp from "../../firebaseInit";
import { selectAuthUserID } from "../../store/auth";

const singeIngredientEditInitialState = {
  status: false,
  ingredient: {},
};

const mapStateToProps = (state, { route }) => ({
  recipe: selectSingleRecipeByID(state, route.params?.recipeID),
  userID: selectAuthUserID(state),
  favorite: selectFavorites(state)
});

export const ListScreen = connect(mapStateToProps, {
  addIngredient,
  updateIngredient,
})(({ route, recipe, favorite, addIngredient, updateIngredient, navigation, userID }) => {
  const {
    recipeID,
    addMode,
    portion,
    duration,
    durationType,
    image,
    photo,
    desc,
    title,
  } = route.params;

  // const isFavoriteRecipe = favorite.find((item) => item === title)
  const [singeIngredientEditState, setSingleIngredientEditState] = useState(
    singeIngredientEditInitialState
  );

  const finishSingleIngredientEdit = () =>
    setSingleIngredientEditState(singeIngredientEditInitialState);
  const initSingleIngredientEdit = (ingredient) =>
    setSingleIngredientEditState({
      status: true,
      ingredient,
    });

  const createDispatchHandler = (methodToDispatch) => (payload = {}) =>
    methodToDispatch({
      recipeID,
      ...payload,
    });

  // const [isFav, setIsFav] = useState(false);
  // const toggleIsFav = () => setIsFav((v) => !v);
  // const [isWish, setIsWish] = useState(false);
  // const toggleIsWish = () => setIsWish((v) => !v);

  const movetoWisthlist = () => {
    fbApp.db.ref(`users/${userID}/wishlist/${title}`).set({
      recipeID,
      portion,
      duration,
      desc,
      durationType,
      title,
      image,
      photo,
    });
    // toggleIsWish()
  };
  const movetoFavlist = () => {
    fbApp.db.ref(`users/${userID}/favlist/${title}`).set({
      recipeID,
      portion,
      duration,
      desc,
      durationType,
      title,
      image,
      photo,
    });
      // toggleIsFav();
  };
  isFavorite = true;
  if(
    favorite.find((item) => item.recipeID === recipeID)
  ){
    isFavorite = false;
  }
  
  const addHandler = createDispatchHandler(addIngredient);
  const updateIngredientHandler = createDispatchHandler(updateIngredient);
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.recipeText}>
        <View style={styles.imgWrapper}>
          <Image style={styles.recipeImg} source={{ uri: image }} />
          <MaterialIcons
            style={styles.backArrow}
            onPress={() => navigation.navigate("HomeTabs")}
            name="arrow-back"
            size={35}
            color="white"
          />
        </View>
        <View style={styles.content}>
          <TouchableOpacity onPress={movetoFavlist}>
            <View style={styles.favorite}>
              <Image
                style={styles.icons}
                source={isFavorite ? ICONS.heart : ICONS.heartEmpty}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.contentWrapper}>
            <CustomText weight="semi" style={styles.title}>
              {title}
            </CustomText>
            <View style={styles.cover}>
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  <Image style={styles.icons} source={ICONS.clock} />
                  <CustomText>{duration} {durationType}</CustomText>
                </View>

                <View style={styles.iconWrapper}>
                  <Image style={styles.icons} source={ICONS.dinner} />
                  <CustomText>{portion} person</CustomText>
                </View>

                <TouchableOpacity onPress={movetoWisthlist}>
                  <View style={styles.iconWrapper}>
                    <Image style={styles.icons} source={ICONS.eventColored} />
                    <CustomText>add to wishlist</CustomText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <CustomText weight="semi" style={styles.text}>
              How to make it
            </CustomText>
            <CustomText style={styles.description}>{desc}</CustomText>
            <CustomText weight="semi" style={styles.text}>
              Ingredients
            </CustomText>
          </View>

          {addMode && (
            <IngredientForm
              singeIngredientEditState={singeIngredientEditState}
              addHandler={addHandler}
              updateIngredientHandler={updateIngredientHandler}
              finishSingleIngredientEdit={finishSingleIngredientEdit}
            />
          )}

          <RecipeContent
            ingredients={recipe.ingredients}
            currentEditIngredientID={singeIngredientEditState.ingredient?.id}
            onEditPress={initSingleIngredientEdit}
          />
        </View>
      </View>
    </ScrollView>
  );
});
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.BUTTON_TEXT,
  },
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
  imgWrapper: {
    width: "100%",
    height: 250,
    padding: 15,
  },
  backArrow: {
    marginTop: 20,
  },
  icons: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  contentWrapper: {
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
  },
});
