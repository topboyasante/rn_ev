import React from "react";
import { View } from "react-native";
import MapViewComponent from "../../../components/maps/MapView";
import Header from "../../../components/screens/home/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchbar from "../../../components/screens/home/Searchbar";
import BottomSheetComponent from "../../../components/ui/bottom-sheet/BottomSheet";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <SafeAreaView className="absolute z-[10] w-full flex justify-center h-auto">
        <Header />
      </SafeAreaView>
      <View className="h-[80%]">
        <MapViewComponent />
      </View>
      <BottomSheetComponent
        content={
          <View className="absolute z-[10] w-full flex justify-center h-auto">
            <Searchbar searchedLocation={(location) => console.log(location)} />
          </View>
        }
      />
    </View>
  );
}
