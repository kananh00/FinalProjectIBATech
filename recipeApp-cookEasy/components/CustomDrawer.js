import React from 'react';
import {StyleSheet,Text,ScrollView, TouchableOpacity,Image,View} from 'react-native';
import { connect } from 'react-redux';

// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { CustomText } from './CustomText';
import {GLOBAL_STYLES} from '../styles/globalStyles';
import { ICONS } from '../styles/icon';
import { IMAGES } from '../styles/images';
import { logOut } from '../store/auth';

 export const CustomDrawer = connect(null,{logOut})(({navigation, username,photo,logOut})=>{
// const userPhoto = photo;
    const logOutHandler = () => {
        logOut();
        navigation.navigate("LOGINPAGE") 
    }
    return (
      <ScrollView>
        <View style={styles.container}> 
         
         <View style={styles.upperpart}>
         <CustomText weight = "bold" style={styles.drawertxt}>cookEasy</CustomText>
         <Image style={styles.userimg} source={photo ? {uri:photo} : IMAGES.avatar} />
         <CustomText weight = "semi" style={styles.username}>{username}</CustomText>
         </View>
            <View style={styles.lists}>

                <TouchableOpacity  
                    onPress={() => navigation.navigate('MyRecipes')}
                    style={[styles.drawerlist,styles.addlistbtn] }
                >
                    <Image  style={styles.imgs} source={ICONS.cookbook}/>
                    <CustomText style={styles.listtext}>my recipes</CustomText>
                </TouchableOpacity >

                <TouchableOpacity 
                //  onPress={() => navigation.navigate('')}
                    style={styles.drawerlist}
                >
                    <Image style={styles.imgs} source={ICONS.list}/>
                    <CustomText style={styles.listtext}>wishlist</CustomText>
                </TouchableOpacity>

                <TouchableOpacity 
                //  onPress={() => navigation.navigate('')} 
                    style={styles.drawerlist}
                >
                    <Image style={styles.imgs} source={ICONS.heart}/>
                    <CustomText style={styles.listtext}>favorites</CustomText>
                </TouchableOpacity>

                <TouchableOpacity 
                //    onPress={() => navigation.navigate('')}
                    style={styles.drawerlist}
                    onPress={ () =>{navigation.navigate('UserSettings')}}
                >
                    <Image  style={styles.imgs} source={ICONS.settings}/>
                    <CustomText style={styles.listtext}>settings</CustomText>
                </TouchableOpacity>

                <TouchableOpacity 
                //    onPress={() => navigation.navigate('')}
                    style={styles.drawerlist}
                    onPress={() =>{navigation.navigate('Create')}}
                >
                    <Image  style={styles.imgs} source={ICONS.plusUnColored}/>
                    <CustomText style={styles.listtext}>create</CustomText>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={logOutHandler}
                    style={styles.logoutbtn}
                >         
                    <CustomText weight = "semi" style={styles.listtext}>LOG OUT</CustomText> 
                    <Image  style={styles.imgs} source={ICONS.logout}/>
                </TouchableOpacity>

            </View>
        </View>
        </ScrollView>
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
  fontSize:45,
  color:'white',
  fontWeight:'bold',
},
userimg:{
  width:100,
  height:100,
  marginVertical:20,
  borderWidth:3,
  borderColor:'white',
  borderRadius:50,
},
username:{
  color:'white',
  fontSize: 30,
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
  // textAlign: "center",
  // alignItems: "center",
  // justifyContent: "center",
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
  marginTop:'15%',
  marginBottom: GLOBAL_STYLES.MARGIN,
},
imgs:{
    width:30,
    height:30
}

})