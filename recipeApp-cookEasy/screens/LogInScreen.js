import React,{useState} from 'react'
import {
    View,Text,Image,StyleSheet,TouchableOpacity,TextInput,Alert,
} from 'react-native'
import { IMAGES } from '../styles/images'
import { COLORS } from '../styles/color'
import { FONT_FAMILIES, loadFonts } from '../styles/fonts'
import { CustomText } from '../components/CustomText'
import { CustomBtn } from '../components/CustomBtn'
import { ICONS } from '../styles/icon'
import { CustomField } from '../components/CustomField'
import { CustomBtnYellow } from '../components/CustomBtnYellow'
import { BackBtn } from '../components/BackBtn'
import { logIn } from '../store/auth'
import { connect } from 'react-redux'
import fbApp from '../firebaseInit'


export const  Login = connect(null,{logIn})(
     ({navigation,logIn}) =>{

  const  [fields, setFields] = useState({
     email: { value: "", label: "Email" },
     password: { value: "", label: "Password" },
   });
  /////////////////////////
  const fieldsChangeHandler = (name,value) => {
    setFields((fields) => ({
      ...fields,
      [name]: {
        ...fields[name],
        value,
      },
    }));
  }; 
  ///////////////////////////


  const validateForm = () => { 
if (fields.email.value.trim() === "") {
     Alert.alert("Email required");
     return false;
   }
   if (fields.password.value === "") {
     Alert.alert("Password required");
     return false;
   }
   return true;
 };
  ///////////////////////////
  const submit = () => {
    if (validateForm()) {
        logIn(  
          fields.email.value,
          fields.password.value
        );
        navigation.navigate("HomeStack");
    }
   
  }; 
   /////////////
// const createUser = () =>{
//   {Object.keys(fields).map((key) => {
//   fbApp.db.ref("users").set(fields.email.value)
// })
// }

  //////////////////////
     return(
         <View style={styles.container}>  
         <View style={{flexDirection:"row",justifyContent:'space-between', alignItems:'center'}}> 
            <BackBtn  
             onPress={() => navigation.navigate("HOMEPAGE")}   
            />
           <CustomText weight = "semi" style={styles.logintxt}>Log In</CustomText></View>
         <View style={styles.wrapper}>
            <Image style={styles.chefimg} source={ICONS.chef}/>
            <CustomText weight = "bold" style={styles.cookeasytxt}>cookEasy</CustomText>
            {/* <CustomField title='e-mail'/>
            <CustomField title='password'/> */}


        {Object.keys(fields).map((key) => {
            if (fields[key]) {
                return(
                    <View key={key}>
                    <CustomText weight="semi" style={styles.title}>
                    {fields[key].label}
                    </CustomText>
                    <TextInput
                    //  {...rest}
                     style={styles.field} 
                     onChangeText={(value) => fieldsChangeHandler(key, value)}
                     />
                  </View>
                )
            }
            return null;
          })}

            <CustomBtnYellow onPress = {submit} title='log in'/>
         </View>
         
         </View>
     )

         } )

 const styles = StyleSheet.create({
container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:COLORS.BG_LOGIN
},
logintxt:{
    color:COLORS.BUTTON_TEXT,
    fontSize:35,
    paddingVertical:15,
    marginBottom: 15,
},
wrapper:{
    backgroundColor:COLORS.BUTTON_TEXT,
    borderRadius:40,
    height: "75%",
    justifyContent: "center",
    alignItems:"center",
    width:"90%"
},
chefimg:{
    width:60,
    height:60
},
cookeasytxt:{
    color:COLORS.BG_LOGIN,
    fontSize:48,
    marginBottom: 30,
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