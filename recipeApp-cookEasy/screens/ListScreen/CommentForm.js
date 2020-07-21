import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { CustomField } from "../../components/CustomField";
import { RadioGroup } from "../../components/RadioGroup";
import { widthByPercent } from "../../utils/widthByPercent";
import { CustomBtn } from "../../components/CustomBtn";
import { COLORS } from "../../styles/color";
import { ICONS } from "../../styles/icon";
import { IMAGES } from "../../styles/images";
import { FONT_FAMILIES } from "../../styles/fonts";
import { connect } from "react-redux";
import { getTheme } from "../../store/theme";

const mapStateToProps = (state) => ({
  theme: getTheme(state),
});

export const CommentForm = connect(mapStateToProps)(
  ({ addCommentHandler, userPhoto, theme }) => {
    const checkTheme = () => {
      if (theme === "dark") {
        return true;
      } else if (theme === "light") {
        return false;
      }
    };

    const fieldInitialState = {
      text: "",
      uPhoto: userPhoto,
    };

    const [fields, setFields] = useState(fieldInitialState);
    const fieldChangeHandler = (name, value) => {
      setFields((fields) => ({
        ...fields,
        [name]: value,
      }));
    };
    const validateForm = () => {
      if (fields.text.trim() === "") {
        Alert.alert("Comment is empty", "Please write something");
        return false;
      }
      return true;
    };

    const onAddComment = () => {
      if (validateForm()) {
        addCommentHandler({ comment: fields });
        setFields(fieldInitialState);
      }
    };

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.row,
            {
              backgroundColor: checkTheme() ? COLORS.GREEN : COLORS.DRAWER_MENU,
            },
          ]}
        >
          <View style={styles.imgWrapper}>
            <Image
              style={styles.userImg}
              source={userPhoto ? { uri: userPhoto } : IMAGES.avatar}
            />
          </View>
          <TextInput
            style={styles.field}
            value={fields.text}
            onChangeText={(value) => fieldChangeHandler("text", value)}
            placeholder="add your comment"
          />
          <TouchableOpacity
            style={[
              styles.sendWrapper,
              {
                backgroundColor: checkTheme()
                  ? COLORS.PURPLE_BTN
                  : COLORS.CREATE_ACCOUNT_COLOR,
              },
            ]}
            onPress={onAddComment}
          >
            <Image style={styles.icon} source={ICONS.send} />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.btnWrapper}>
          <CustomBtn title="Add to ingredients" onPress={onAddComment} />
        </View> */}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 21,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
  },
  sendWrapper: {
    width: 35,
    height: 35,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  imgWrapper: {
    width: 50,
    height: 50,
  },
  userImg: {
    ...StyleSheet.absoluteFill,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  field: {
    height: 42,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 10,
    width: "65%",
    maxWidth: "65%",
    color: "white",
    fontFamily: FONT_FAMILIES.bold,
  },
});
