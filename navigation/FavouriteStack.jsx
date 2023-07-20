import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MoviesScreen from "../screens/MoviesScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import TVDetailScreen from "../screens/TVDetailScreen";
import PersonDetailScreen from "../screens/PersonDetailScreen";
import Favourites from "../screens/Favourites";

const Stack = createNativeStackNavigator();

export default function FavouriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavouritesMain"
        options={{ headerShown: false }}
        component={Favourites}
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
