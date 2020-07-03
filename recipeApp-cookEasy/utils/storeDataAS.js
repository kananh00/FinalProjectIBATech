import { AsyncStorage } from "react-native";

export const SET_APP_DATA = "SET_APP_DATA";

export async function updateAS(store) {
  const state = store.getState();
  const data = JSON.stringify(state);
  await AsyncStorage.setItem("recipe-app-data", data);
}

export async function getDataFromAS(store) {
  const storedDataJSON = await AsyncStorage.getItem("recipe-app-data");
  if (storedDataJSON) {
    const data = JSON.parse(storedDataJSON);
    store.dispatch({
      type: SET_APP_DATA,
      payload: data,
    });
  }
}
