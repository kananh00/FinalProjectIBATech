import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { COLORS } from "../../styles/color";
import { CustomText } from "../../components/CustomText";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import { connect } from "react-redux";
import { getTheme } from "../../store/theme";

const mapStateToProps = (state) => ({
  theme: getTheme(state),
});

export const RecipesItem = connect(mapStateToProps)(
  ({ title, count, unit, isCurrentOnEdit = false, onEditPress, theme }) => {
    const checkTheme = () => {
      if (theme === "dark") {
        return true;
      } else if (theme === "light") {
        return false;
      }
    };
    return (
      <TouchableOpacity
        style={styles.container}
        disabled={isCurrentOnEdit}
        onPress={onEditPress}
      >
        <View
          style={[
            styles.row,
            {
              backgroundColor: checkTheme()
                ? COLORS.BG_SIGN_UP
                : COLORS.PRIMARY,
            },
          ]}
        >
          <CustomText weight="semi" style={styles.name}>
            {title}
          </CustomText>
          <View style={styles.countWrapper}>
            <CustomText style={styles.count}>
              {count} {unit}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginLeft: 25,
    marginRight: 25,
    borderWidth: 2,
    padding: 20,
    borderRadius: GLOBAL_STYLES.BORDER_RADIUS,
    borderColor: "transparent",
    backgroundColor: COLORS.PRIMARY,
    marginBottom: 10,
    paddingVertical: 7,
    alignItems: "center",
  },
  countWrapper: {
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: GLOBAL_STYLES.BORDER_RADIUS,
    width: 100,
    paddingVertical: 5,
    alignItems: "center",
  },
});
