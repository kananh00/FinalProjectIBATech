import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { AppLoading } from "expo";
import { loadFonts } from "./styles/fonts";



export default function App() {
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
      return (
        <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
      );
    }
  }
