import { GOOGLE_PLACES_API_KEY } from "@env";
import React from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Searchbar({ searchedLocation }) {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search for EV Stations"
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          searchedLocation(details?.geometry?.location);
        }}
        query={{
          key: `${GOOGLE_PLACES_API_KEY}`,
          language: "en",
        }}
      />
    </View>
  );
}
