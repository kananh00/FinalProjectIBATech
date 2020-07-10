import React from "react";
import { StyleSheet, ScrollView, Image, Text, View, TouchableOpacity } from "react-native";

import { ICONS } from "../../styles/icon";
import { COLORS } from "../../styles/color";
import { IMAGES } from "../../styles/images";
import { CustomText } from "../../components/CustomText";
import {GLOBAL_STYLES} from '../../styles/globalStyles';
export const RecipesList = ({
    name,
    image, 
    portion,
    onDeletePress, 
    onEditPress,
    onPress, 
    userPhoto, 
    myRecipeMode, 
    favAndWishMode
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
              {!myRecipeMode && !favAndWishMode &&
                <View style={styles.imgWrapper}>
                  <Image style={styles.userImg} source={userPhoto ? { uri: userPhoto } : IMAGES.avatar} />
                </View>
              }

              {favAndWishMode &&
                <View style={styles.column}>
                <TouchableOpacity onPress = {onDeletePress} style = {styles.iconWrapper}>
                  <Image  style={styles.icon} source={ICONS.close}/>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.favimgWrapper}>
                <Image style={styles.userImg} source={{ uri: userPhoto }}/>
                </TouchableOpacity>
              </View>
              }

              {myRecipeMode &&
                <View style={styles.column}>
                  <TouchableOpacity onPress = {onEditPress} style = {styles.iconWrapper}>
                    <Image style={styles.icon} source={ICONS.edit} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress = {onDeletePress} style = {styles.iconWrapper}>
                    <Image style={styles.icon} source={ICONS.deleteIcon} />
                  </TouchableOpacity>
                 
                </View>
              }
              
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
    favimgWrapper: {
      width: 43,
      height: 43,
    },
    btnWrapper: {
      flexDirection: "row",
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
        backgroundColor: COLORS.PRIMARY,
      }
    
  });
  