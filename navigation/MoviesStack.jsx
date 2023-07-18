import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MoviesScreen from "../screens/MoviesScreen";
import { common } from "./HomeStack";

const Stack = createNativeStackNavigator();

export default function MoviesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoviesMain"
        options={{ headerShown: false }}
        component={MoviesScreen}
      />
      {common}
    </Stack.Navigator>
  );
}
