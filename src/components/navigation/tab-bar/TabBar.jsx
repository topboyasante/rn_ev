import { SafeAreaView, TouchableOpacity, View } from "react-native";
import {
  HomeIcon as HomeIconMini,
  BookmarkIcon as BookmarkIconMini,
  UserIcon as UserIconMini,
} from "react-native-heroicons/mini";
import Text from "../../ui/text/CustomText";

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <SafeAreaView edges={["bottom"]} className="bg-white">
      <View className="px-5 flex flex-row justify-between items-center">
        {/* 
          The state prop has a routes property (which is an array containing all the routes in our app).
          We map through the array to return a <TouchableOpacity/> for each array item.
        */}
        {state.routes.map((route, index) => {
          //Descriptors is an array of objects, and each object has an "options" property.
          //route here refers to an item in the routes array. "route" is an object
          //route has an "key" property, and we are using it as the index to access the "options" property of each item in the descriptors array
          const { options } = descriptors[route.key];
          //the label variable checks if options.tabBarLabel is not undefined and sets it to options.tabBarLabel if true.
          //if false, it checks if options.title is not undefined and sets it to options.tabBarLabel
          //if false it sets it to route.name
          //this varible is used to provide a "label" for the tab bar routes
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          //variable to check if the link we are currently mapping is the active or focused link.
          const isFocused = state.index === index;

          //function that runs when you press a tabItem
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          //function that runs when you LongPress a tabItem
          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          //this function renders an Icon for each route
          function renderIcons(label) {
            switch (label) {
              case "Home":
                return (
                  <HomeIconMini
                    size={25}
                    color={isFocused ? "black" : "gray"}
                  />
                );
              case "Favorites":
                return (
                  <BookmarkIconMini
                    size={25}
                    color={isFocused ? "black" : "gray"}
                  />
                );
              case "Profile":
                return (
                  <UserIconMini
                    size={25}
                    color={isFocused ? "black" : "gray"}
                  />
                );
          
            }
          }

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={label}
              className={isFocused ? "border-t-2 border-t-rounded" : ""}
            >
              <View className="pt-2 flex justify-center items-center">
                {renderIcons(label)}
                <Text
                  type={isFocused ? "semibold" : "regular"}
                  content={label}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}