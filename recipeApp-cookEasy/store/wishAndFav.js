import fbApp from "../firebaseInit";
import { Alert } from "react-native";
import {selectAuthUserID} from './auth';
const SET_FAVORITES = "SET_FAVORITES";
const SET_WISHLIST = "SET_WISHLIST";
const SET_DELETE = "SET_DELETE";

export const MODULE_NAME = "favWish";

export const selectFavorites = (state) => state[MODULE_NAME].favlist;
export const selectWishlist = (state) => state[MODULE_NAME].wishlist;


const initialState = {
    favlist: [],
    wishlist: [],
  };
  
  export function reducer(state = initialState, { type, payload }) {
    switch (type) {
      case SET_FAVORITES:
        return {
          ...state,
          favlist: payload,
        };
      case SET_WISHLIST:
        return {
          ...state,
          wishlist: payload,
        };
      default:
        return state;
    }
  }
  

  // ACTION CREATORS
export const setFavList = (payload) => ({
    type: SET_FAVORITES,
    payload,
  });
  export const setWishList = (payload) => ({
    type: SET_WISHLIST,
    payload,
  })
  
  export const getAndListenFavsList = () => async (dispatch, getState) => {
    const userID = selectAuthUserID(getState());
    try {
      const ref = fbApp.db.ref(`users/${userID}/favlist`);
      ref.on(
        "value",
        (snapshot) => {
          console.log(snapshot);
          if (snapshot.exists()) {
            const favObj = snapshot.val();
            const favArr = Object.keys(favObj).map((key) => ({
              id: key,
              ...favObj[key],
            }));
  
            dispatch(setFavList(favArr));
          }
        },
        (err) => {
          console.log("getAndListenFavsList err", err);
        }
      );
  
      return () => ref.off();
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getAndListenWishList = () => async (dispatch, getState) => {
    const userID = selectAuthUserID(getState());
    try {
      const ref = fbApp.db.ref(`users/${userID}/wishlist`);
      ref.on(
        "value",
        (snapshot) => {
          console.log(snapshot);
          if (snapshot.exists()) {
            const wishObj = snapshot.val();
            const wishArr = Object.keys(wishObj).map((key) => ({
              id: key,
              ...wishObj[key],
            }));
  
            dispatch(setWishList(wishArr));
          }
        },
      );
  
      return () => ref.off();
    } catch (error) {
      console.log(error);
    }
  };
  