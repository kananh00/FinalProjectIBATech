import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { CustomText } from "./CustomText";
import { COLORS } from "../styles/color";
import { widthByPercent } from "../utils/widthByPercent";
import { connect } from "react-redux";
import { getTheme } from "../store/theme";

const mapStateToProps = (state) => ({
  theme: getTheme(state),
});
export const RadioGroup = connect(mapStateToProps)(
  ({
    options,
    value,
    onValueChange,
    contentContainerStyle,
    radioItemStyle,
    theme,
  }) => (
    <View style={[styles.container, contentContainerStyle]}>
      {options.map((option) => {
        const isActive = value === option;
        const checkTheme = () => {
          if (theme === "dark") {
            return true;
          } else if (theme === "light") {
            return false;
          }
        };
        return (
          <TouchableOpacity
            onPress={() => onValueChange(option)}
            style={{
              width: widthByPercent(
                100 / options.length,
                2 + options.length - 1
              ),
            }}
            key={option}
          >
            <View
              style={[
                styles.radioBtn,
                {
                  opacity: isActive ? 1 : 0.5,
                  backgroundColor: checkTheme()
                    ? COLORS.BG_SIGN_UP
                    : COLORS.PRIMARY,
                },
                radioItemStyle,
              ]}
            >
              <CustomText
                weight={isActive ? "bold" : "regular"}
                style={styles.radioLabel}
              >
                {option}
              </CustomText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioBtn: {
    height: 42,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
