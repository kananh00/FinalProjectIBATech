import React from 'react'
import {
    View,Text,Image,StyleSheet,TouchableOpacity
} from 'react-native'
import { IMAGES } from '../styles/images'
import { COLORS } from '../styles/color'
import { FONT_FAMILIES, loadFonts } from '../styles/fonts'
import { CustomText } from '../components/CustomText'
import { CustomBtn } from '../components/CustomBtn'
import { useNavigation } from "@react-navigation/native";


 export const WelcomeScreen = ({navigation}) =>{
     return(
         <View style={styles.container}>
            <View style={styles.upper}>
                <CustomText weight = "bold" style={styles.cookeasytxt}>cookEasy</CustomText>
                <Image  style={styles.welcomeimg} source={IMAGES.welcomeImg}/>
            </View>
            <View style={styles.below}>
                    <CustomText weight = "medium" style={styles.slogan}>For learning new recipes, Let’s start </CustomText>
                    <CustomBtn title='create account'
                        onPress={() => navigation.navigate('SIGNUPPAGE')}
                    />
                <View style={{flexDirection:'row'}}>
                    <CustomText>already have, </CustomText>
                    <TouchableOpacity onPress={() => navigation.navigate('LOGINPAGE')}>
                        <CustomText weight = "semi" style={styles.logintxt} >log in</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        
         </View>
     )
 } 
 const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    upper:{
    justifyContent:'center',
    backgroundColor:COLORS.PRIMARY,
    borderBottomLeftRadius:200,
    borderBottomRightRadius:200,
    alignItems:'center',
    },
    welcomeimg:{
        width:300,
        height:300,
    },
    cookeasytxt:{
        fontSize:48,
        color:'white',
        marginTop: 40,

    },
    slogan:{
        fontSize:30,
        textAlign:'center',
        marginVertical:15
    },
    below:{
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:25
    },
    logintxt:{
        fontWeight:"bold"
    }
 })