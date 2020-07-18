import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { CustomBtn } from "../../components/CustomBtn";
import { CustomText } from "../../components/CustomText";
import { COLORS } from "../../styles/color";
import { connect } from "react-redux";
import {
  selectAuthPhoto,
  selectAuthUsername,
  uploadAuthPhoto,
  logIn,
editUsername,
} from "../../store/auth";
import { IMAGES } from "../../styles/images";
import { ICONS } from "../../styles/icon";

const mapStateToProps = (state) => ({
  photo: selectAuthPhoto(state),
  username: selectAuthUsername(state),
});

const imagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
};



export const AvatarUploader = connect(mapStateToProps, {
  uploadAuthPhoto,
  editUsername

})(({ photo, username, uploadAuthPhoto,editUsername }) => {
  const selectImage = async (isCamera) => {
    try {
      const permission = await requestCameraPermissions();
      if (permission) {
        let image;
        if (isCamera) {
          image = await ImagePicker.launchCameraAsync(imagePickerOptions);
        } else {
          image = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
        }
        const { cancelled, uri } = image;

        if (!cancelled) {
          uploadAuthPhoto(uri);
        }
      }
    } catch (error) {}
  };



  const fieldsInitialState = {
    username: username,
  };

  const [fields, setFields] = useState(fieldsInitialState);

  const fieldsChangeHandler = (name, value) =>
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));


  const onSubmit = () => {
    if (fields.username.trim() === "") editUsername(username);
    else 
    editUsername(fields.username);

  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.field}
          value={fields.username}
          onChangeText={(val) => fieldsChangeHandler("username",val)}
        />
        <View style={styles.imgWrapper}>
          <Image
            style={styles.photo}
            source={photo ? { uri: photo } : IMAGES.avatar}
          />
<View style={{flexDirection:"row"}}>
          <TouchableOpacity
            style={styles.camera}
            onPress={() => selectImage(true)}
          >
            <Image style={styles.imgs} source={ICONS.camera} />
            <CustomText weight="semi">Take a Photo</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.camera}
            onPress={() => selectImage()}
          >
            <Image style={styles.imgs} source={ICONS.photogallery} />
            <CustomText weight="semi">Selecet photo</CustomText>
          </TouchableOpacity>
          </View>
        </View>

<CustomBtn
title={"save changes"}
   onPress={onSubmit}
/>

      </KeyboardAvoidingView>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  photo: {
    borderRadius: 150,
    borderWidth: 3,
    width: 150,
    height: 150,
    borderColor: COLORS.PRIMARY,
    marginVertical: 25,
  },
  editbtn: {
    height: 41,
  },
  field: {
   
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: COLORS.FIELD_BG,
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 10,
    minWidth: "90%",
    paddingVertical: 6,
  },
  imgWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imgs: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  camera: {
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal:20,
    marginVertical:15
  },
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
