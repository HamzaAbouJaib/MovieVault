import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";

const Drawer = createDrawerNavigator();

export function AppNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  );
}
