import React from 'react';
import {createDrawerNavigator,DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {NavigationContainer}from '@react-navigation/native';

// import { CustomDrawer } from '../components';
import { HomeScreen, Login, SignUp } from '../screens';
import { ICONS } from '../styles/icon'
import { BackBtn } from "../components/BackBtn";
import { HomeStack } from "./HomeStack";
import { ListScreen } from "../screens/ListScreen";
const {Navigator,Screen} =  createDrawerNavigator();
export const RootDrawer = () => {
    return(
        <NavigationContainer>
            <Navigator
            //  drawerContent={(props) =>
            //     <CustomDrawer {...props} />
            //  }
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
             <Screen name="HomeStack" component={HomeStack} />
             <Screen name="List" component={ListScreen} />   
            
               
            </Navigator>
        </NavigationContainer>
    )
}