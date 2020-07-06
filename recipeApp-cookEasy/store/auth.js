import fbApp from "../firebaseInit";
import { Alert } from "react-native";

// // ACTION TYPES
const SET_AUTH_STATUS = "SET_AUTH_STATUS";
const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS";
const SET_AUTH_LOGOUT = "SET_AUTH_LOGOUT";
const SET_AUTH_PHOTO = "SET_AUTH_PHOTO";

// // SELECTORS
export const MODULE_NAME = "auth";
export const selectAuthStatus = state => state[MODULE_NAME].status;
export const selectAuthUserID = (state) => state[MODULE_NAME].userID;
export const selectAuthUsername = (state) => state[MODULE_NAME].username;
export const selectAuthPhoto = (state) => state[MODULE_NAME].photo;

// // REDUCER
const initialState = {
  status: false,
  userID: null,
  username: null,
  photo: null,
};

export function reducer(state = initialState, { type, payload }) {
  switch (type ) {
    case SET_AUTH_STATUS:
      return {
        ...state,
        status: payload,
      };
    case SET_AUTH_SUCCESS:
      return {
        ...state,
        status: true,
        userID: payload.userID,
        username: payload.username,
        photo: payload.photo,
      };
    case SET_AUTH_PHOTO:
      return {
        ...state,
        photo: payload,
      };
    case SET_AUTH_LOGOUT:
      return {
        ...state,
        status: false,
        userID: null,
        username: null,
      };
    default:
      return state;
  }
}

// // ACTION CREATORS
export const setAuthStatus = (payload) => ({
  type: SET_AUTH_STATUS,
  payload,
});
export const setAuthSuccess = (payload) => ({
  type: SET_AUTH_SUCCESS,
  payload,
});
export const setAuthPhoto = (payload) => ({
  type: SET_AUTH_PHOTO,
  payload,
});
export const setAuthLogout = () => ({
  type: SET_AUTH_LOGOUT,
});

// // MIDDLEWARES

export const logIn = (email, password) => async (dispatch) => {
  try {
    const {
      user: { uid },
    } = await  fbApp.auth.signInWithEmailAndPassword(email, password);
    
    const userDataSnapshot = await fbApp.db.ref(`users/${uid}`).once("value");
    const { username, photo } = userDataSnapshot.val();

    dispatch(setAuthSuccess({ userID: uid, username, photo }));
  }
  catch (error){
    console.log('login error',error);
  }
};
    

export const signUp = (email, password, username) => async (dispatch) => {
  try {
    const {
      user: { uid },
    } = await fbApp.auth.createUserWithEmailAndPassword(email, password);

    fbApp.db.ref(`users/${uid}`).set({
      username,
      photo: "",
    });

    dispatch(setAuthSuccess({ userID: uid, username }));
  } catch (error) {
    console.log("signUp error", error);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await fbApp.auth.signOut();
    dispatch(setAuthLogout());
  } catch (error) {
    console.log("logOut error", error);
  }
};

export const uploadAuthPhoto = (uri) => async (dispatch, getState) => {
  try {
    
    const response = await fetch(uri); 
    const blob = await response.blob();
    const key = (await fbApp.db.ref("keys").push()).key;
    const snap = await fbApp.storage.ref(key).put(blob);
    const url = await snap.ref.getDownloadURL();
    const userID = selectAuthUserID(getState());
    const result = await fbApp.db.ref(`users/${userID}/photo`).set(url);

    dispatch(setAuthPhoto(url));
  } catch (error) {
    Alert.alert(error.message);
  }
};

// fbApp.auth.onAuthStateChanged((user) => {
//   console.log("AuthStateChanged", user);
// });
