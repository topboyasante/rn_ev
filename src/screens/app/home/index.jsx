import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import MapViewComponent from "../../../components/maps/MapView";
import Header from "../../../components/screens/home/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchbar from "../../../components/screens/home/Searchbar";
import BottomSheetComponent from "../../../components/ui/bottom-sheet/BottomSheet";
import Text from "../../../components/ui/text/CustomText";
import { UserLocationContext } from "../../../context/UserLocationContext";
import useMutationRequest from "../../../hooks/useMutation";
import PlaceListView from "../../../components/screens/home/PlaceListView";

export default function HomeScreen() {
  const [searchLocationModalOpen, setSearchLocationModalOpen] = useState(false);
  const { location, setlocation } = useContext(UserLocationContext);
  const { getNearbyData, nearbyData } = useMutationRequest("nearby_data");

  function getNearbyPlaces() {
    const data = {
      includedTypes: ["electric_vehicle_charging_station"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 5000.0,
        },
      },
    };
    getNearbyData(data);
  }
  console.log(nearbyData)

  useEffect(() => {
    location && getNearbyPlaces();
  }, [location]);

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
          <View className="p-5">
            <View className="flex flex-row justify-between items-center">
              <Text
              type={"semibold"}
                content={"EV Stations Nearby"}
                additionalClasses={`text-xl`}
              />
              <TouchableOpacity
                onPress={() => setSearchLocationModalOpen(true)}
              >
                <Text content={"Search Stations"} />
              </TouchableOpacity>
            </View>
            <View className="mt-5">
              {nearbyData && <PlaceListView placeList={nearbyData} />}
            </View>
          </View>
        }
      />
      <Modal
        visible={searchLocationModalOpen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View>
          <View className="absolute z-[10] w-full flex justify-center h-auto p-5">
            <View className="flex flex-row justify-end">
              <TouchableOpacity
                onPress={() => setSearchLocationModalOpen(false)}
              >
                <Text content={"Cancel"} additionalClasses={`text-red-500`} />
              </TouchableOpacity>
            </View>
            <Searchbar searchedLocation={(location) => console.log(location)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
