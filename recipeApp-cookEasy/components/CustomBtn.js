import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/color";

export const CustomBtn = ({ title, onPress, width, titleStyle = {} }) => (
  <TouchableOpacity onPress={onPress} style={ width }>
    <View style={styles.btn}>
      <CustomText weight="bold" style={{ ...styles.title, ...titleStyle }}>
        {title}
      </CustomText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    height: 55,
    backgroundColor: COLORS.CREATE_ACCOUNT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    minWidth:170,
    marginVertical:10,

  },
  title: {
    fontSize: 18,
    color: COLORS.BUTTON_TEXT,
    textTransform: "uppercase",
    padding: 15
  },
});
