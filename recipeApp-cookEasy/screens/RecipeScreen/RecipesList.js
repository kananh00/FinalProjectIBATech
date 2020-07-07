import React from "react";
import { StyleSheet, ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../styles/color";
import { CustomText } from "../../components/CustomText";
import {GLOBAL_STYLES} from '../../styles/globalStyles';
export const RecipesList = ({
    name,
    image, portion, onPress, userPhoto
}) => {
    return (
        <ScrollView>
        <TouchableOpacity
        onPress={onPress}
          style={styles.container}
        >
          <View style={styles.cover}>
            <View style={styles.row}>
                <View style={styles.img}>
                <Image style={styles.projectCardImg} source={{ uri: image }} />
              </View>
              <CustomText weight = "medium" style={styles.title}>
                {name}
              </CustomText>
              <View style={styles.imgWrapper}>
                <Image style={styles.userImg} source={{ uri: userPhoto }} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        </ScrollView>
      );
    };
    

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
      borderColor: COLORS.PRIMARY,
      borderRadius: 20,
      padding: 8,
      // paddingHorizontal: 20,
      marginTop: GLOBAL_STYLES.MARGIN,
      
      
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      color: "black",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center"
    },
    img: {
        // paddingTop: 11,
        width: 100,
        height: 80,
        // paddingBottom: 15,
    },
    imgWrapper: {
      // paddingTop: 11,
      width: 50,
      height: 50,
      // paddingBottom: 15,
  },
    projectCardImg: {
        ...StyleSheet.absoluteFill,
        borderWidth: 2,
        borderColor: COLORS.PRIMARY,
        borderRadius: 20,
        
      },
    userImg: {
      ...StyleSheet.absoluteFill,
        borderWidth: 2,
        borderColor: COLORS.PRIMARY,
        borderRadius: 100,
      }
    
  });
  