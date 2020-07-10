import React,{useState} from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  KeyboardAwareScrollView 
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
  updateUsername,
  
} from "../../store/auth";
import { IMAGES } from "../../styles/images";
import { ICONS } from "../../styles/icon";

const mapStateToProps = (state) => ({
  photo: selectAuthPhoto(state),
  username: selectAuthUsername(state),
  newusername: updateUsername(state),
});

const imagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
};



export const AvatarUploader = connect(mapStateToProps, { uploadAuthPhoto,updateUsername })(
  ({ photo, username, uploadAuthPhoto,updated_username }) => {
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

//    const fieldInitialState = {
//   username: ""
// }; 
// const [field, setField] = useState({
//   username:{value:''}
// });
// const fieldChangeHandler = (name, value) => {
//   setField((field) => ({
    
//       ...field[value],
      
    
//   }));
// };
const [value,setValue] = React.useState('');

return (
     
     <View style={styles.container}>
       
        <KeyboardAvoidingView behavior="padding">
          <TextInput style={styles.field}
         value={username} 
         onChangeText={(nextValue) => setValue(nextValue)}
        /> 
         <View style={styles.imgWrapper}>
          <Image
            style={styles.photo}
            source={photo ? { uri: photo } : IMAGES.avatar}
          />
     
          <TouchableOpacity
            style={styles.camera}
            onPress={() => selectImage(true)}
          >
            <Image style={styles.imgs} source={ICONS.camera} />
            <CustomText weight="semi">Take a Photo</CustomText>
          </TouchableOpacity>
        </View>

        <CustomBtn
          style={styles.editbtn}
          onPress={() => selectImage()}
          title={"Select Photo"}
        />

       
        </KeyboardAvoidingView>
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical:10
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
    // height: 42,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: COLORS.FIELD_BG,
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 10,
    minWidth: "90%",
    paddingVertical:6
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
