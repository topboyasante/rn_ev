import React, { useCallback } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Text from "../../../components/ui/text/CustomText";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleOAuthLogin = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View className="flex justify-center h-full p-5">
      {/* Heading */}
      <View>
        <Image
          source={require("../../../../assets/images/ev-logo.webp")}
          className="w-[50] h-[50] object-contain mb-3"
        />
        <Text
          content={"Sign in to EV"}
          type={"bold"}
          additionalClasses={"text-2xl"}
        />
        <Text
          content={"Find EV Charging Spots around you!"}
          type={"regular"}
          additionalClasses={"text-lg text-[#656565]/60"}
        />
      </View>
      {/* Sign In Options */}
      <View className="my-5">
        <TouchableOpacity
          className="bg-black px-4 py-3 rounded-md"
          onPress={handleOAuthLogin}
        >
          <Text
            content={"Login with Google"}
            additionalClasses={"text-white text-center"}
            type={"semibold"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
