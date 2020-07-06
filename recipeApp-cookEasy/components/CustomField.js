import React from 'react'
import {TextInput,StyleSheet,View} from 'react-native'
import { COLORS } from '../styles/color'
import { CustomText } from "./CustomText";
import { FONT_FAMILIES } from "../styles/fonts";
export const CustomField = ({
    title,
    width,
    style,
    contentContainerStyle,
    ...rest
  }) => (
    <View style={contentContainerStyle}>
      <CustomText weight="semi" style={styles.title}>
        {title}
      </CustomText>
      <TextInput {...rest} placeholder={title} style={[styles.field, style]} />
    </View>
  );
  


const styles = StyleSheet.create({
    title: {
      opacity: 0.75,
      textAlign: "center",
      fontSize: 12,
      
    },
    field: {
      height: 42,
    //   textAlign: "center",
      paddingHorizontal: 15,
      fontSize: 14,
      backgroundColor: COLORS.FIELD_BG,
      borderRadius: 10,
      marginTop: 7,
      marginBottom: 10,
      fontFamily: FONT_FAMILIES.bold,
      minWidth: "90%"
    },
  });
  