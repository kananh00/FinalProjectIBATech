import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import { IMAGES } from "../styles/images";
import { COLORS } from "../styles/color";
import { FONT_FAMILIES, loadFonts } from "../styles/fonts";
import { CustomText } from "../components/CustomText";
import { CustomBtn } from "../components/CustomBtn";
import { ICONS } from "../styles/icon";
import { CustomField } from "../components/CustomField";
import { CustomBtnYellow } from "../components/CustomBtnYellow";
import { BackBtn } from "../components/BackBtn";
import { logIn, signUp, setAuthStatus } from "../store/auth";
import { connect } from "react-redux";
import fbApp from "../firebaseInit";

export const Login = connect(null, { logIn, signUp })(
  ({ navigation, logIn, signUp }) => {
    const [fields, setFields] = useState({
      email: { value: "", label: "Email" },
      password: { value: "", label: "Password" },
    });
    const fieldsKeys = useRef(Object.keys(fields));
    /////////////////////////
    const fieldsChangeHandler = (name, value) => {
      setFields((fields) => ({
        ...fields,
        [name]: {
          ...fields[name],
          value,
        },
      }));
    };
    ///////////////////////////

    const validateForm = () => {
      if (fields.email.value.trim() === "") {
        Alert.alert("Email required");
        return false;
      }
      if (fields.password.value === "") {
        Alert.alert("Password required");
        return false;
      }

      return true;
    };
    ///////////////////////////
    const submit = () => {
      if (validateForm()) {
        logIn(fields.email.value, fields.password.value);
      }
    };

    //////////////////////
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BackBtn onPress={() => navigation.navigate("WelcomeScreen")} />
          <CustomText weight="semi" style={styles.logintxt}>
            Log In
          </CustomText>
        </View>
        <View style={styles.wrapper}>
          <Image style={styles.chefimg} source={ICONS.chef} />
          <CustomText weight="bold" style={styles.cookeasytxt}>
            cookEasy
          </CustomText>

          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
            {fieldsKeys.current.map((key) => {
              if (fields[key] !== fields.password) {
                return (
                  <View key={key}>
                    <CustomText weight="semi" style={styles.title}>
                      {fields[key].label}
                    </CustomText>
                    <TextInput
                      style={[styles.field]}
                      keyboardType={"email-address"}
                      onChangeText={(value) => fieldsChangeHandler(key, value)}
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
          <CustomBtnYellow onPress={submit} title="log in" />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.BG_LOGIN,
  },
  logintxt: {
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
    marginBottom: 30,
  },
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
