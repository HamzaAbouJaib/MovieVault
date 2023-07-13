import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import TVScreen from "../screens/TVScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="MovieDetails"
          options={{ headerShown: false }}
          component={MovieScreen}
        />
        <Stack.Screen
          name="TVDetails"
          options={{ headerShown: false }}
          component={TVScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
