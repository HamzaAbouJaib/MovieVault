import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { common } from "./HomeStack";
import TVsScreen from "../screens/TVsScreen";

const Stack = createNativeStackNavigator();

export default function TVsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TVsMain"
        options={{ headerShown: false }}
        component={TVsScreen}
      />
      {common}
    </Stack.Navigator>
  );
}
