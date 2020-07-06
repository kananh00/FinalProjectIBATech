import React from 'react';
import {StyleSheet,Text,TouchableOpacity,Image,View} from 'react-native';
import { ICONS } from '../styles/icon';
import { logOut } from '../store/auth';
import { connect } from 'react-redux';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { CustomText } from './CustomText';

 export const CustomDrawer = connect(null,{logOut})(({navigation, username,user,logOut})=>{
const photo= user;
    const logOutHandler = () => {
        logOut();
        navigation.navigate("LOGINPAGE") 
    }
    return (
        <View style={styles.container}> 
         
         <View style={styles.upperpart}>
         <CustomText style={styles.drawertxt}>cook Easy</CustomText>

         <Image style={styles.userimg}
         source={{uri:photo}}
         />
        <CustomText style={styles.username}>{username}</CustomText>
         </View>

         <View style={styles.lists}>

         <TouchableOpacity  
        //    onPress={() => navigation.navigate('')}
         style={[styles.drawerlist,styles.addlistbtn] }>
           <Image  style={styles.imgs} source={ICONS.cookbook}/>
         <CustomText style={styles.listtext}>my recipes</CustomText>
         </TouchableOpacity >

         <TouchableOpacity 
        //    onPress={() => navigation.navigate('')}
           style={styles.drawerlist}>
                        <Image style={styles.imgs} source={ICONS.list}/>
         <CustomText style={styles.listtext}>wishlist</CustomText>
         </TouchableOpacity>

         <TouchableOpacity 
        //    onPress={() => navigation.navigate('')} 
          style={styles.drawerlist}>
                       <Image style={styles.imgs} source={ICONS.heart}/>

         <CustomText style={styles.listtext}>favorites</CustomText>
         </TouchableOpacity>

         <TouchableOpacity 
        //    onPress={() => navigation.navigate('')}
         style={styles.drawerlist}
         onPress={ () =>{navigation.navigate('UserSettings')}
    }>
                      <Image  style={styles.imgs} source={ICONS.settings}/>
         <CustomText style={styles.listtext}>settings</CustomText>
         </TouchableOpacity>

         <TouchableOpacity 
           onPress={logOutHandler}
         style={styles.logoutbtn}>
                     
         <CustomText style={styles.listtext}>LOG OUT</CustomText> 
         <Image  style={styles.imgs} source={ICONS.logout}/>
         </TouchableOpacity>
         </View>
        </View>
    )
})
const styles = StyleSheet.create({
container:{
    flex:1,
},
upperpart:{
backgroundColor:'#DDA0DD',
borderBottomLeftRadius:40,
borderBottomRightRadius:40,
alignItems:'center',
paddingVertical:30,
marginBottom:'15%'
},

drawertxt:{
  fontSize:36,
color:'white',
fontWeight:'bold',
},
userimg:{
  width:90,
  height:90,
  marginVertical:20,
  borderWidth:3,
  borderColor:'white',
  borderRadius:50,


},
username:{
  color:'white',
  fontSize:25
},
drawerlist:{
  marginBottom:16,
  height:44,
  backgroundColor:'#DDA0DD',
  alignItems:'center',
  justifyContent:'center',
  marginHorizontal:20,
  borderRadius:15,
flexDirection:'row',
justifyContent:'space-around'
},
listtext:{
  color:'white',
  fontSize:20,


},
logoutbtn:{
  backgroundColor:"#C90808",
  flexDirection:"row",
  marginHorizontal:20,
  height:44,
justifyContent:"center",
alignItems:"center",
borderRadius:20,
justifyContent:'space-around',
// marginTop:50
marginTop:'15%'
},
imgs:{
    width:30,
    height:30
}

})