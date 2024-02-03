import React, { useContext } from "react";
import { Image, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewStyles from "../../utils/map-styles/MapStyles.json";
import { UserLocationContext } from "../../context/UserLocationContext";

export default function MapViewComponent() {
  const { location, setLocation } = useContext(UserLocationContext);

  return (
    location?.latitude && (
      <View className="flex-1">
        <MapView
          className="w-full h-full"
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          customMapStyle={MapViewStyles}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
          >
            {/* <Image
              source={require("../../../assets/images/car-marker.png")}
              className="w-[35] h-[35]"
            /> */}
          </Marker>
        </MapView>
      </View>
    )
  );
}
