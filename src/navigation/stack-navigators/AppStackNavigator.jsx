import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabNavigator from "../tab-navigators/AppTabNavigator";

const Stack = createNativeStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="tabs" component={AppTabNavigator} />

  </Stack.Navigator>
  )
}