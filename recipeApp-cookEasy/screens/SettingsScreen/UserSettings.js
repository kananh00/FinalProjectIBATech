import React, { useState } from 'react'
import {View,Text,StyleSheet,TextInput} from 'react-native'
import fbApp from '../../firebaseInit'
import { headerDefaultStyle } from '../../styles/headerDefaultStyle'
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from '../../styles/color';
import { CustomText } from '../../components/CustomText';
import { FONT_FAMILIES, loadFonts } from '../../styles/fonts';
import { AvatarUploader } from './AvatarUploader';
import { BackBtn } from '../../components/BackBtn';
import { NavigationContainer } from '@react-navigation/native';
import { CustomBtn } from '../../components/CustomBtn';
import { HomeTabs } from '../../navigation/HomeTabs';



const { Navigator, Screen } = createStackNavigator();
export const UserSettings = ({username,navigation}) =>{
    return(
        <View style={styles.container}>
          <View style={styles.header}>
              <BackBtn 
              onPress={()=>navigation.navigate("HomeStack")}
              />
           <CustomText weight = "bold" style={styles.headertxt}>User Settings</CustomText>  
          </View>
         
         <View style={{alignItems:'center'}}> 
             <AvatarUploader/>

             <CustomText weight="semi" style={styles.title}>
                   name
                    </CustomText>
                    <TextInput    style={styles.field}
                      
                    value={username} />
                    
                     <CustomText weight="semi" style={styles.title}>
                   e-mail
                    </CustomText>
                    <TextInput   style={styles.field}  />
             <CustomBtn title={'Save Changes'}/>
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
container:{
   flex:1,

},
header:{
    backgroundColor: COLORS.PRIMARY,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent:'center',
    // paddingHorizontal:"100%",
    paddingVertical:40,
    alignItems:'center',
    flexDirection:'row',
  },
  headertxt:{
      color:COLORS.BUTTON_TEXT,
      fontSize:30,
      
  },




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


})