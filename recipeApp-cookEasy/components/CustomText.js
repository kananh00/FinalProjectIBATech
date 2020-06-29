import React from "react";
import { Text } from "react-native";
import { FONT_FAMILIES } from "../styles/fonts";

export const CustomText = ({ weight, style, children, ...rest }) => {
  const styles = {
    fontFamily: FONT_FAMILIES[weight] || FONT_FAMILIES.regular,
    ...style,
  };
  return (
    <Text style={styles} {...rest}>
      {children}
    </Text>
  );
};
