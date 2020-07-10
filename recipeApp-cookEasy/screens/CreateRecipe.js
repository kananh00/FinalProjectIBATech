import React, { useState } from "react";
import { StyleSheet, View, Alert, KeyboardAvoidingView,ScrollView } from "react-native";
import { connect } from "react-redux";
// import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { CustomField } from "../components/CustomField";
// import { RadioGroup } from "../components/RadioGroup";
import { CustomBtn } from "../components/CustomBtn";
// import { Container } from "../commons/Container";
// import { LISTS_TYPES } from "../utils/listsTypes";
import { GLOBAL_STYLES } from "../styles/globalStyles";
import { addRecipe } from "../store/data";
import { createID } from "../utils/createID";
import { selectAuthUsername, selectAuthPhoto } from "./../store/auth";
import { COLORS } from "../styles/color";
import { BackBtn } from "../components/BackBtn";
import { CustomText } from "../components/CustomText";
import { HeaderBtn } from "../components/HeaderBtn";
// import {Header} from '../commons/Header';

const createFormInitialFieldState = {
  recipeTitle: "",
  recipeImage: "",
  recipeDuration: "",
  recipePortion: "",
  recipeDesc: "",
};

const mapStateToProps = (state) => ({
  username: selectAuthUsername(state),
  photo: selectAuthPhoto(state)
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
      }
      else if (fields.recipeImage.trim() === "") {
        Alert.alert("Field is empty", "Recipe image is required");
        return;
      }
      else if (fields.recipeDuration.trim() === "") {
        Alert.alert("Field is empty", "Duration time is required");
        return;
      }
      else if (fields.recipePortion.trim() === "") {
        Alert.alert("Field is empty", "Portion is required");
        return;
      }
      else if (fields.recipeDesc.trim() === "") {
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
        portion: fields.recipePortion,
        desc: fields.recipeDesc,

      });

      setFields(createFormInitialFieldState);
    };

    return (
       
      
      <View style={styles.wrapper}>  
       <KeyboardAvoidingView behavior="padding">
<View style={styles.header}>
  <CustomText style={styles.headertxt}  weight='bold' >ADD YOUR RECIPE</CustomText>
</View>
<View style={styles.fieldswrapper}>
       <ScrollView>
         <CustomField
          title="paste Image Url"
          value={fields.recipeImage}
          onChangeText={(value) => fieldChangeHandler("recipeImage", value)}
        />
        <CustomField
          title="Meal name"
          value={fields.recipeTitle}
          onChangeText={(value) => fieldChangeHandler("recipeTitle", value)}
        />
        
        <CustomField
          title="Prepare duration"
          value={fields.recipeDuration}
          keyboardType={"number-pad"}
          onChangeText={(value) => fieldChangeHandler("recipeDuration", value)}
        />
        <CustomField
          title="Portion"
          value={fields.recipePortion}
          keyboardType={"number-pad"}
          onChangeText={(value) => fieldChangeHandler("recipePortion", value)}
        />
        <CustomField
          style = {{height: 100}}
          title="How to cook"
          value={fields.recipeDesc}
          onChangeText={(value) => fieldChangeHandler("recipeDesc", value)}
        />
        </ScrollView> 
      
        {/* <RadioGroup
          options={Object.keys(LISTS_TYPES)}
          value={fields.listType}
          onValueChange={(value) => fieldChangeHandler("listType", value)}
          contentContainerStyle={styles.topSpacing}
        /> */}
        <View style = {styles.btnWrapper}> 
          <CustomBtn
          title="Next"
          style={styles.topSpacing}
          onPress={submitHandler}
        />
        </View>
        </View>
        </KeyboardAvoidingView>
      </View>
      
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor:COLORS.BUTTON_TEXT,
    flex:1,


  },
 
  btnWrapper: {
    width: "50%",
    alignItems: "center",
  },
  header:{
    backgroundColor: COLORS.PRIMARY,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent:'center',
    // paddingHorizontal:"100%",
    paddingVertical:30,
    alignItems:'center',
    flexDirection:'row',
  },
  headertxt:{
      color:COLORS.BUTTON_TEXT,
      fontSize:25,
      
  },
  fieldswrapper:{
    alignItems:'center',
  paddingVertical:20,
  
  }
});
