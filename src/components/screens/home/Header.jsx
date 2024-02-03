import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();
  return (
    <View className="h-auto px-5">
      <View className="flex flex-row justify-between items-center">
        <Image
          source={require("../../../../assets/images/ev-logo.webp")}
          className="w-[50] h-[50] object-contain mb-3"
        />
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[45] h-[45] rounded-full"
        />
      </View>
    </View>
  );
}
