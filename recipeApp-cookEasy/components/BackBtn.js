import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

import { ICONS } from "../styles/icon";

export const BackBtn = ({ iconName, onPress, side }) => (
  <TouchableOpacity
    style={
styles.wrapper}
    onPress={onPress}
  >
    <Image style={styles.icon} source={ICONS.back || ""} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    width: 22,
    height: 22,
    right: "90%",
    marginBottom: 10
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});
