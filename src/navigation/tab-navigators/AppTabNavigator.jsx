import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../../components/navigation/tab-bar/TabBar";

//Page Imports
import HomeScreen from "../../screens/app/home";
import FavoritesScreen from "../../screens/app/favorites";
import ProfileScreen from "../../screens/app/profile";

const Tab = createBottomTabNavigator();

export default function AppTabNavigator() {
  return (
    <>
      {/* Pass a header component here, to give the app some sort of layout */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Favorites" component={FavoritesScreen}/>
        <Tab.Screen name="Profile" component={ProfileScreen}/>
      </Tab.Navigator>
    </>
  );
}