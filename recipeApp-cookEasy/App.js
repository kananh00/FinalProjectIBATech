import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { ApplicationProvider } from "@ui-kitten/components";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { RootDrawer } from "./navigation/RootDrawer";
import { loadFonts } from "./styles/fonts";
import store from "./store";
import * as eva from "@eva-design/eva";


export default function App() {
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
    );
  }
  return (
    <Provider store={store}>

      <ApplicationProvider {...eva} theme={eva.light}>
      <RootDrawer />
      </ApplicationProvider>

  </Provider>
  );
}
