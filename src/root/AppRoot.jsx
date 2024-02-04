import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { CLERK_PUBLISHABLE_KEY } from "@env";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import AppStackNavigator from "../navigation/stack-navigators/AppStackNavigator";
import LoginScreen from "../screens/auth/login";
import { UserLocationContext } from "../context/UserLocationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Makes the native splash screen (configured in app.json) remain visible until hideAsync is called.
SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function AppRoot() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    "inter-reg": Inter_400Regular,
    "inter-semibold": Inter_600SemiBold,
    "inter-bold": Inter_700Bold,
  });

  // const [fontsLoaded, fontError] = useFonts({
  //   "inter-reg": Inter_400Regular,
  //   "inter-semibold": Inter_600SemiBold,
  //   "inter-bold": Inter_700Bold,
  // });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      // Hides the native splash screen immediately.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <NavigationContainer>
          <ClerkProvider
            publishableKey={`${CLERK_PUBLISHABLE_KEY}`}
            tokenCache={tokenCache}
          >
            <View onLayout={onLayoutRootView} className="flex-1">
              <StatusBar style="auto" />

              {/* <SignedIn/> Contains all pages that show when we are signed in */}
              <SignedIn>
                <AppStackNavigator />
              </SignedIn>

              {/* <SignedOut/> Contains all pages that show when we are signed out */}
              <SignedOut>
                <LoginScreen />
              </SignedOut>
            </View>
          </ClerkProvider>
        </NavigationContainer>
      </UserLocationContext.Provider>
    </GestureHandlerRootView>
  );
}
