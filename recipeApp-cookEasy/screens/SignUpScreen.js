import React, { useState, useRef } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { IMAGES } from "../styles/images";
import { COLORS } from "../styles/color";
import { FONT_FAMILIES, loadFonts } from "../styles/fonts";
import { CustomText } from "../components/CustomText";
import { CustomBtn } from "../components/CustomBtn";
import { ICONS } from "../styles/icon";
import { CustomBtnYellow } from "../components/CustomBtnYellow";
import { BackBtn } from "../components/BackBtn";
import { connect } from "react-redux";
import { signUp } from "../store/auth";

///////////////////////////////////////////////
export const SignUp = connect(null, { signUp })(({ navigation, signUp }) => {
  const [isAgree, setIsAgree] = useState(false);
  const toggleIsAgree = () => setIsAgree((v) => !v);

  ///////////////////////////////////////
  const fieldsChangeHandler = (name, value) => {
    setFields((fields) => ({
      ...fields,
      [name]: {
        ...fields[name],
        value,
      },
    }));
  };
  //////////////////////////////////////////
  const validateForm = () => {
    if (fields.username.value.trim() === "") {
      Alert.alert("Username required");
      return false;
    }
    if (fields.email.value.trim() === "") {
      Alert.alert("Email required");
      return false;
    }
    if (fields.password.value === "") {
      Alert.alert("Password required");
      return false;
    }
    if (fields.repassword.value === "") {
      Alert.alert("Confirm password ");
      return false;
    }
    if (fields.password.value !== fields.repassword.value) {
      Alert.alert("Passwords must match");
      return false;
    }
    if (fields.password.value.length < 6) {
      Alert.alert("Password  should contain at least 6");
      return false;
    }
    if (!isAgree) {
      Alert.alert(" agree with Terms and conditions");
      return false;
    }
    return true;
  };
  //////////////////////////////////////

  const submit = () => {
    if (validateForm()) {
      signUp(fields.email.value, fields.password.value, fields.username.value);
    }
  };

  ///////////////////////////////
  const [fields, setFields] = useState({
    username: { value: "", label: "Username" },
    email: { value: "", label: "Email" },
    password: { value: "", label: "Password" },
    repassword: { value: "", label: "Confirm Password" },
  });
  const fieldsKeys = useRef(Object.keys(fields));
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BackBtn onPress={() => navigation.navigate("HOMEPAGE")} />
        <CustomText weight="semi" style={styles.signUptxt}>
          Sign Up
        </CustomText>
      </View>

      <View style={styles.wrapper}>
        <KeyboardAvoidingView behavior="padding">
          {fieldsKeys.current.map((key) => {
            if (
              fields[key] !== fields.password &&
              fields[key] !== fields.repassword
            ) {
              return (
                <View key={key}>
                  <CustomText weight="semi" style={styles.title}>
                    {fields[key].label}
                  </CustomText>
                  <TextInput
                    style={[styles.field]}
                    onChangeText={(value) => fieldsChangeHandler(key, value)}
                    keyboardType={"email-address"}
                  />
                </View>
              );
            } else {
              return (
                <View key={key}>
                  <CustomText weight="semi" style={styles.title}>
                    {fields[key].label}
                  </CustomText>
                  <TextInput
                    style={[styles.field]}
                    secureTextEntry
                    onChangeText={(value) => fieldsChangeHandler(key, value)}
                  />
                </View>
              );
            }
            return null;
          })}
        </KeyboardAvoidingView>
        <View style={styles.checkboxview}>
          <TouchableOpacity onPress={toggleIsAgree}>
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: isAgree ? COLORS.PRIMARY : COLORS.FIELD_BG,
                },
              ]}
            />
          </TouchableOpacity>
          <CustomText>agree with </CustomText>
          <TouchableOpacity
          //   onPress={Link}
          >
            <CustomText weight="semi">Terms and Conditions</CustomText>
          </TouchableOpacity>
        </View>
        <CustomBtnYellow onPress={submit} title="Create" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.BG_SIGN_UP,
  },
  signUptxt: {
    color: COLORS.BUTTON_TEXT,
    fontSize: 35,
    paddingVertical: 15,
    marginBottom: 15,
  },
  wrapper: {
    backgroundColor: COLORS.BUTTON_TEXT,
    borderRadius: 40,
    minHeight: "70%",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    paddingVertical: 30,
  },
  chefimg: {
    width: 60,
    height: 60,
  },
  cookeasytxt: {
    color: COLORS.BG_LOGIN,
    fontSize: 48,
    fontWeight: "bold",
  },
  checkbox: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 5,
  },
  checkboxview: {
    flexDirection: "row",
    marginVertical: 10,
    width: "90%",
    justifyContent: "center",
  },
  /////////////////////
  title: {
    opacity: 0.75,
    textAlign: "center",
    fontSize: 12,
  },
  field: {
    height: 42,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: COLORS.FIELD_BG,
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 10,
    fontFamily: FONT_FAMILIES.bold,
    minWidth: "90%",
  },
});
