import React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { ICONS } from "../../styles/icon";
import { COLORS } from "../../styles/color";
import { IMAGES } from "../../styles/images";
import { CustomText } from "../../components/CustomText";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import { connect } from "react-redux";
import { getTheme } from "../../store/theme";

const mapStateToProps = (state) => ({
  theme: getTheme(state),
});

export const RecipesList = connect(mapStateToProps)(
  ({
    name,
    image,
    onDeletePress,
    onCrossPress,
    onEditPress,
    onPress,
    userPhoto,
    myRecipeMode,
    favAndWishMode,
    theme,
  }) => {
    const checkTheme = () => {
      if (theme === "dark") {
        return true;
      } else if (theme === "light") {
        return false;
      }
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View
          style={[
            styles.cover,
            {
              borderColor: checkTheme() ? COLORS.BG_SIGN_UP : COLORS.PRIMARY,
            },
          ]}
        >
          <View style={styles.row}>
            <View style={styles.img}>
              <Image
                style={[
                  styles.recipeImg,
                  {
                    borderColor: checkTheme()
                      ? COLORS.BG_SIGN_UP
                      : COLORS.PRIMARY,
                  },
                ]}
                source={{ uri: image }}
              />
            </View>
            <CustomText weight="medium" style={styles.title}>
              {name}
            </CustomText>
            {!myRecipeMode && !favAndWishMode && (
              <View style={styles.imgWrapper}>
                <Image
                  style={[
                    styles.userImg,
                    {
                      borderColor: checkTheme()
                        ? COLORS.BG_SIGN_UP
                        : COLORS.PRIMARY,
                    },
                  ]}
                  source={userPhoto ? { uri: userPhoto } : IMAGES.avatar}
                />
              </View>
            )}

            {favAndWishMode && (
              <View style={styles.column}>
                <TouchableOpacity
                  onPress={onCrossPress}
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor: checkTheme()
                        ? COLORS.BG_SIGN_UP
                        : COLORS.PRIMARY,
                    },
                  ]}
                >
                  <Image style={styles.icon} source={ICONS.close} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.favimgWrapper}>
                  <Image
                    style={[
                      styles.userFavImg,
                      {
                        borderColor: checkTheme()
                          ? COLORS.BG_SIGN_UP
                          : COLORS.PRIMARY,
                      },
                    ]}
                    source={userPhoto ? { uri: userPhoto } : IMAGES.avatar}
                  />
                </TouchableOpacity>
              </View>
            )}

            {myRecipeMode && (
              <View style={styles.column}>
                <TouchableOpacity
                  onPress={onEditPress}
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor: checkTheme()
                        ? COLORS.BG_SIGN_UP
                        : COLORS.PRIMARY,
                    },
                  ]}
                >
                  <Image style={styles.icon} source={ICONS.edit} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onDeletePress}
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor: checkTheme()
                        ? COLORS.BG_SIGN_UP
                        : COLORS.PRIMARY,
                    },
                  ]}
                >
                  <Image style={styles.icon} source={ICONS.deleteIcon} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cover: {
    width: "90%",
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    marginTop: GLOBAL_STYLES.MARGIN,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 80,
  },
  imgWrapper: {
    width: 50,
    height: 50,
  },
  favimgWrapper: {
    width: 43,
    height: 43,
  },
  userFavImg: {
    width: 43,
    height: 43,
    borderRadius: 100,
    borderWidth: 2,
  },
  btnWrapper: {
    flexDirection: "row",
  },
  recipeImg: {
    ...StyleSheet.absoluteFill,
    borderWidth: 2,
    borderRadius: 20,
  },
  userImg: {
    ...StyleSheet.absoluteFill,
    borderWidth: 2,
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 100,
    width: 43,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});
