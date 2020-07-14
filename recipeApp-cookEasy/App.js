import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';

import { AppLoading } from "expo";
import { Provider } from "react-redux";

import { RootDrawer } from "./navigation/RootDrawer";
import { loadFonts } from "./styles/fonts";
import store from "./store";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
    );
  }
  return (
    <Provider store={store}>
      <RootDrawer />
    </Provider>
  );
}
