import { View, FlatList, Image } from "react-native";
import Text from "../../ui/text/CustomText";
import React from "react";
import { GOOGLE_PLACES_API_KEY } from "@env";

export default function PlaceListView({ placeList }) {
  return (
    <View>
      {placeList?.length > 0 ? (
        <View>
          <FlatList
            data={placeList}
            renderItem={({ item, index }) => (
              <View className="w-[300px] h-[250px] bg-[#f5f5f5] rounded-md" key={index}>
                <Image
                  source={
                    item?.photos
                      ? {
                          uri: `https://places.googleapis.com/v1/${item?.photos[0]?.name}/media?key=${GOOGLE_PLACES_API_KEY}&maxHeightPx=800&maxWidthPx=1200`,
                        }
                      : require("../../../../assets/images/ev-charging.png")
                  }
                  className="w-full h-[50%] object-cover"
                />
                <View className="p-4">
                  <Text
                    content={item.displayName.text}
                    type={"semibold"}
                    additionalClasses={`text-xl`}
                  />
                  <Text
                    content={item.shortFormattedAddress}
                    additionalClasses={`text-neutral-500`}
                  />
                  <View className="pt-3">
                    <Text
                      content={`Connectors:${
                        item?.evChargeOptions?.connectorCount
                          ? item?.evChargeOptions?.connectorCount
                          : 0
                      }`}
                      additionalClasses={`text-neutral-500`}
                    />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={{ columnGap: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <Text content={"No"} />
      )}
    </View>
  );
}
