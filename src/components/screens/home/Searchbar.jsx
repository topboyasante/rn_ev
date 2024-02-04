import { GOOGLE_PLACES_API } from "@env";
import React from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Searchbar({ searchedLocation }) {
  return (
    <View className="px-5">
      <GooglePlacesAutocomplete
        placeholder="Search for EV Stations"
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          searchedLocation(details?.geometry?.location);
        }}
        query={{
          key: `${GOOGLE_PLACES_API}`,
          language: "en",
        }}
      />
    </View>
  );
}
