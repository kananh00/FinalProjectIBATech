import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/color";
import { connect } from "react-redux";
import { getTheme } from "../store/theme";

const mapStateToProps = (state) => ({
  theme: getTheme(state),
});

export const CustomBtn = connect(mapStateToProps)(
  ({ theme, title, onPress, width, titleStyle = {} }) => {
    const checkTheme = () => {
      if (theme === "dark") {
        return true;
      } else if (theme === "light") {
        return false;
      }
    };
    return (
      <TouchableOpacity onPress={onPress} style={width}>
        <View
          style={[
            styles.btn,
            {
              backgroundColor: checkTheme()
                ? COLORS.PURPLE_BTN
                : COLORS.CREATE_ACCOUNT_COLOR,
            },
          ]}
        >
          <CustomText weight="bold" style={{ ...styles.title, ...titleStyle }}>
            {title}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    minWidth: 170,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    color: COLORS.BUTTON_TEXT,
    textTransform: "uppercase",
    padding: 15,
  },
});
