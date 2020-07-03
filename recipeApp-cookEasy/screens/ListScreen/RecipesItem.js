import React from "react";
import { StyleSheet,Text, View, TouchableOpacity, Image } from "react-native";

import { COLORS } from "../../styles/color";
import { CustomText } from "../../components/CustomText";
export const RecipesItem = ({
  title,
  count,
  unit,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
    >
      <View>
        <CustomText style={styles.name}>{title}</CustomText>
        <CustomText style={styles.count}>
          {count} {unit}
        </CustomText>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
})