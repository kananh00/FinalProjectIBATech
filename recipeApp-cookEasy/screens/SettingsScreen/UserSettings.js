import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import fbApp from "../../firebaseInit";
import { headerDefaultStyle } from "../../styles/headerDefaultStyle";
import { COLORS } from "../../styles/color";
import { CustomText } from "../../components/CustomText";
import { CustomField } from "../../components/CustomField";
import { FONT_FAMILIES, loadFonts } from "../../styles/fonts";
import { AvatarUploader } from "./AvatarUploader";
import { BackBtn } from "../../components/BackBtn";
import { CustomBtn } from "../../components/CustomBtn";
import { HeaderBtn } from "../../components/HeaderBtn";

// const fieldInitialState = {
//     name = "",
//   };

const { Navigator, Screen } = createStackNavigator();
export const UserSettings = ({ username, navigation }) => {
  // const [fields, setFields] = useState(fieldInitialState);
  // const fieldChangeHandler = (name, value) => {
  //   setFields((fields) => ({
  //     ...fields,
  //     [name]: value,
  //   }));
  // };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText weight="bold" style={styles.headertxt}>
          User Settings
        </CustomText>
      </View>

      <View style={{ alignItems: "center" }}>
        <AvatarUploader />
        <CustomBtn title={"Save Changes"} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BUTTON_TEXT,
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
