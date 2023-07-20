import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MoviesScreen from "../screens/MoviesScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import TVDetailScreen from "../screens/TVDetailScreen";
import PersonDetailScreen from "../screens/PersonDetailScreen";

const Stack = createNativeStackNavigator();

export default function MoviesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoviesMain"
        options={{ headerShown: false }}
        component={MoviesScreen}
      />
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
    </Stack.Navigator>
  );
}
