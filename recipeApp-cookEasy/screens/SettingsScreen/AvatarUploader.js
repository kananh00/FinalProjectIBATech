import React from 'react'
import {View,Image,StyleSheet, Alert} from 'react-native'
import *as Permissions from 'expo-permissions'
import *as  ImagePicker from 'expo-image-picker'
import { CustomBtn } from '../../components/CustomBtn'
import { COLORS } from '../../styles/color'
import { connect } from 'react-redux'
import { selectAuthPhoto,uploadAuthPhoto, logIn } from '../../store/auth'


const mapStateToProps = (state) => ({
    photo: selectAuthPhoto(state),
  });
  
  const imagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
  };
  
  export const AvatarUploader = connect(mapStateToProps, { uploadAuthPhoto })(
    ({ photo, uploadAuthPhoto }) => {
      const selectImage = async (isCamera) => {
        try {
          const permission = await requestCameraPermissions();
          if (permission) {
            let image;
            if (isCamera) {
              image = await ImagePicker.launchCameraAsync(imagePickerOptions);
            } else {
              image = await ImagePicker.launchImageLibraryAsync(
                imagePickerOptions
              );
            }
            const { cancelled, uri } = image;
  
            if (!cancelled) {
              uploadAuthPhoto(uri);
            }
          }
        } catch (error) {}
      };
  return(
<View style={styles.container}>
   <View style={styles.imgWrapper}>
       <Image style={styles.photo}
       source={
        //  {if(logIn)
        { uri: photo }} 
       
       />
   </View> 
<CustomBtn  style={styles.editbtn} 
////{true}take photo
onPress={() => selectImage()}
title={'Edit Photo'}/>
</View>

    )
})
const styles = StyleSheet.create({
container:{
justifyContent:'center',
alignItems:'center'
},
photo:{
borderRadius:150,
borderWidth:3,
width:150,
height:150,
borderColor:COLORS.PRIMARY,
marginVertical:25,
},
editbtn:{   
    height:41
}

});


async function requestCameraPermissions() {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        return true;
      } else {
        Alert.alert("Fail", "Need provide camera permission for this feature");
        return false;
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }