import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import TVDetailScreen from "../screens/TVDetailScreen";
import PersonDetailScreen from "../screens/PersonDetailScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      {common}
    </Stack.Navigator>
  );
}

export const common = (
  <>
    <Stack.Screen
      name="MovieDetails"
      options={{ headerShown: false }}
      component={MovieDetailScreen}
    />
    <Stack.Screen
      name="TVDetails"
      options={{ headerShown: false }}
      component={TVDetailScreen}
    />
    <Stack.Screen
      name="PersonDetails"
      options={{ headerShown: false }}
      component={PersonDetailScreen}
    />
    <Stack.Screen
      name="Search"
      options={{ headerShown: false }}
      component={SearchScreen}
    />
  </>
);
