import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { CLERK_PUBLISHABLE_KEY } from "@env";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native";
import AppStackNavigator from "../navigation/stack-navigators/AppStackNavigator";
import LoginScreen from "../screens/auth/login";

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
    <NavigationContainer>
      <ClerkProvider
        publishableKey={`${CLERK_PUBLISHABLE_KEY}`}
        tokenCache={tokenCache}
      >
        <SafeAreaView onLayout={onLayoutRootView} className="flex-1">
          <StatusBar style="auto" />

          {/* <SignedIn/> Contains all pages that show when we are signed in */}
          <SignedIn>
            <AppStackNavigator/>
          </SignedIn>

          {/* <SignedOut/> Contains all pages that show when we are signed out */}
          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </SafeAreaView>
      </ClerkProvider>
    </NavigationContainer>
  );
}
