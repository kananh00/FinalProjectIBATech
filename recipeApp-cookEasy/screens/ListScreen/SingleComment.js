import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { COLORS } from "../../styles/color";
import { CustomText } from "../../components/CustomText";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import { IMAGES } from "../../styles/images";
export const SingleComment = ({uPhoto, text }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imgWrapper}>
          <Image
            style={styles.userImg}
            source={uPhoto ? { uri: uPhoto } : IMAGES.avatar}
          />
        </View>
        <CustomText numberOfLines = {1} weight="semi" style={styles.text}>
          {text}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: GLOBAL_STYLES.MARGIN,
    marginRight: GLOBAL_STYLES.MARGIN,
    borderWidth: 2,
    padding: 10,
    borderRadius: GLOBAL_STYLES.BORDER_RADIUS,
    borderColor: "transparent",
    backgroundColor: COLORS.PRIMARY,
    marginBottom: 10,
    paddingVertical: 7,
    alignItems: "center",
  },
  userImg: {
    ...StyleSheet.absoluteFill,
    borderWidth: 2,
    borderColor: "white",
    
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  imgWrapper: {
    width: 50,
    height: 50,
  },
  text: {
      marginLeft: 10,
      maxWidth: "80%",
  }
});
