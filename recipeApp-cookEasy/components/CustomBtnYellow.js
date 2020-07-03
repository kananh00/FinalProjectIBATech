import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/color";

export const CustomBtnYellow = ({ title, onPress, width, style, titleStyle = {} }) => (
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
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    minWidth:260,
    marginVertical:10,
    marginBottom:30

  },
  title: {
    fontSize: 18,
    color: COLORS.BUTTON_TEXT,
    textTransform: "uppercase",
  },
});
