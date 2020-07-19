import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { CustomField } from "../components/CustomField";
import { CustomBtn } from "../components/CustomBtn";
import { GLOBAL_STYLES } from "../styles/globalStyles";
import { addRecipe } from "../store/data";
import { createID } from "../utils/createID";
import { selectAuthUsername, selectAuthPhoto } from "./../store/auth";
import { COLORS } from "../styles/color";
import { RadioGroup } from "../components/RadioGroup";
import { CustomText } from "../components/CustomText";

const TIME_TYPES = ["min", "hour"];

const createFormInitialFieldState = {
  recipeTitle: "",
  recipeImage: "",
  recipeDuration: "",
  durationType: TIME_TYPES[0],
  recipePortion: "",
  recipeDesc: "",
};

const mapStateToProps = (state) => ({
  username: selectAuthUsername(state),
  photo: selectAuthPhoto(state),
});

export const CreateRecipe = connect(mapStateToProps, { addRecipe })(
  ({ navigation, addRecipe, username, photo }) => {
    const [fields, setFields] = useState(createFormInitialFieldState);

    const fieldChangeHandler = (name, value) =>
      setFields((fields) => ({
        ...fields,
        [name]: value,
      }));

    const submitHandler = () => {
      if (fields.recipeTitle.trim() === "") {
        Alert.alert("Field is empty", "Recipe name is required");
        return;
      } else if (fields.recipeImage.trim() === "") {
        Alert.alert("Field is empty", "Recipe image is required");
        return;
      } else if (fields.recipeDuration.trim() === "") {
        Alert.alert("Field is empty", "Duration time is required");
        return;
      } else if (fields.recipePortion.trim() === "") {
        Alert.alert("Field is empty", "Portion is required");
        return;
      } else if (fields.recipeDesc.trim() === "") {
        Alert.alert("You should write how to cook it");
        return;
      }
      const recipeID = createID();
      const userName = username;
      const userPhoto = photo;
      addRecipe({ ...fields, recipeID, userName, userPhoto });

      navigation.navigate("List", {
        // title: fields.recipeTitle,
        recipeID,
        username,
        photo,
        addMode: true,
        title: fields.recipeTitle,
        image: fields.recipeImage,
        duration: fields.recipeDuration,
        durationType: fields.durationType,
        portion: fields.recipePortion,
        desc: fields.recipeDesc,
      });

      setFields(createFormInitialFieldState);
    };

    return (
      <View style={styles.wrapper}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.header}>
            <CustomText style={styles.headertxt} weight="bold">
              Add your Recipe
            </CustomText>
          </View>
          <ScrollView>
            <View style={styles.fieldswrapper}>
              <CustomField
                numberOfLines={1}
                title="paste Image Url"
                value={fields.recipeImage}
                onChangeText={(value) =>
                  fieldChangeHandler("recipeImage", value)
                }
              />
              <CustomField
                title="Meal name"
                value={fields.recipeTitle}
                onChangeText={(value) =>
                  fieldChangeHandler("recipeTitle", value)
                }
              />

              <CustomField
                title="Prepare duration"
                value={fields.recipeDuration}
                keyboardType={"number-pad"}
                onChangeText={(value) =>
                  fieldChangeHandler("recipeDuration", value)
                }
              />
              <RadioGroup
                value={fields.durationType}
                onValueChange={(value) => fieldChangeHandler("durationType", value)}
                contentContainerStyle={styles.types}
                options={TIME_TYPES}
              />

              <CustomField
                title="Portion"
                value={fields.recipePortion}
                keyboardType={"number-pad"}
                onChangeText={(value) =>
                  fieldChangeHandler("recipePortion", value)
                }
              />
              <CustomField
                style={{ height: 100 }}
                title="How to cook"
                value={fields.recipeDesc}
                onChangeText={(value) =>
                  fieldChangeHandler("recipeDesc", value)
                }
              />
              <View style={styles.btnWrapper}>
                <CustomBtn
                  title="Next"
                  style={styles.topSpacing}
                  onPress={submitHandler}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.BUTTON_TEXT,
    flex: 1,
  },
  btnWrapper: {
    alignItems: "center",
    bottom: GLOBAL_STYLES.MARGIN,
    paddingTop: 3,
  },
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
    flexDirection: "row",
  },
  headertxt: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 25,
    paddingHorizontal: 20,
  },
  fieldswrapper: {
    alignItems: "center",
    paddingVertical: 20,
  },
  types: {
    marginVertical: 14,
  },
});
