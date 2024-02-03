import React from "react";
import { View } from "react-native";
import MapViewComponent from "../../../components/maps/MapView";
import Header from "../../../components/screens/home/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchbar from "../../../components/screens/home/Searchbar";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <SafeAreaView className="absolute z-[10] w-full flex justify-center h-auto">
        <Header />
        <Searchbar searchedLocation={(location)=>console.log(location)}/>
      </SafeAreaView>
      <MapViewComponent />
    </View>
  );
}
