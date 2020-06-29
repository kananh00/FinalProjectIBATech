import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/color";

export const CustomBtn = ({ title, onPress, width, style, titleStyle = {} }) => (
  <TouchableOpacity onPress={onPress} style={{ width }}>
    <View style={[styles.btn, style]}>
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
  },
  title: {
    fontSize: 18,
    color: COLORS.BUTTON_TEXT,
    textTransform: "uppercase",
  },
});
