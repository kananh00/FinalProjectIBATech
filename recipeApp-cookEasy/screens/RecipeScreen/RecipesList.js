import React from "react";
import { StyleSheet, ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../styles/color";
import { CustomText } from "../../components/CustomText";
export const RecipesList = ({
    name,
    image, portion, onPress
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
              <CustomText style={styles.title}>
                {name}
              </CustomText>
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
    },
    cover: {
      width: "90%",
      borderWidth: 2,
      borderColor: COLORS.PRIMARY,
      borderRadius: 20,
      padding: 15,
      paddingHorizontal: 20,
      marginTop: 20,
      
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
        paddingTop: 11,
        width: 100,
        height: 80,
        paddingBottom: 15,
    },
    projectCardImg: {
        ...StyleSheet.absoluteFill,
        borderWidth: 2,
        borderColor: COLORS.PRIMARY,
        borderRadius: 20,
        
      },
    
  });
  