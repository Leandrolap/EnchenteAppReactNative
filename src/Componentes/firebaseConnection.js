import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBEMCdPCRwOb39sRZc_JdkvVsDk6RvLfjg",
    authDomain: "enchenteapp.firebaseapp.com",
    databaseURL: "https://enchenteapp-default-rtdb.firebaseio.com",
    projectId: "enchenteapp",
    storageBucket: "enchenteapp.appspot.com",
    messagingSenderId: "398169895830",
    appId: "1:398169895830:web:3175511c891f4d066063b7",
    measurementId: "G-Y5LX8C51HQ"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app)

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  })

  export {db};