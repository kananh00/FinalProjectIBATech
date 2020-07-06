import React from 'react';
import {createDrawerNavigator,DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {NavigationContainer}from '@react-navigation/native';

import { CustomDrawer } from '../components/CustomDrawer';
import { HomeScreen, Login, SignUp, UserSettings, CreateRecipe } from '../screens';
import { ICONS } from '../styles/icon'
import { BackBtn } from "../components/BackBtn";
import { HomeStack } from "./HomeStack";
import { ListScreen } from "../screens/ListScreen";
import { selectAuthStatus, selectAuthUsername } from '../store/auth';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  username: selectAuthUsername(state),
  auth: selectAuthStatus(state)
});

const {Navigator,Screen} =  createDrawerNavigator();

export const RootDrawer = connect(mapStateToProps)(({auth, username}) => {
    return(
        <NavigationContainer>

            <Navigator
             drawerContent={(props) =>
                <CustomDrawer {...props} username={username} />
             }
             > 
        <Screen  name={'HOMEPAGE'} component={HomeScreen}/>
             <Screen name={'LOGINPAGE'} component={Login}  
                options={({ navigation}) => ({
                    title: "Sign Up",
                    headerLeft: () => (
                      <BackBtn
                        side="left"
                        iconName="back"
                        onPress={() => {
                          navigation.navigate("HOMEPAGE");
                        }}
                      />
                    ),
                  })}
             />
             <Screen name={'SIGNUPPAGE'} component={SignUp}
                options={({ navigation}) => ({
                    headerLeft: () => (
                      <BackBtn
                        side="left"
                        iconName="back"
                        onPress={() => {
                          navigation.navigate("HOMEPAGE");
                        }}
                      />
                    ),
                  })}
             />
             {/* {auth ?<HomeStack/> :<HomeScreen/> } */}
             <Screen name="HomeStack" component={HomeStack} />
             <Screen name="List" component={ListScreen} />   
            <Screen name ="UserSettings" component={UserSettings}/>
                 <Screen name="Create" component={CreateRecipe} /> 
            </Navigator>
        </NavigationContainer>
    )
})

            
            
