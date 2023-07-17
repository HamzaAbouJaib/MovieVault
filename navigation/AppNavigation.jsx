import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import { primaryTheme } from "../themes/primary";
import { Text } from "react-native";

const Drawer = createDrawerNavigator();

export function AppNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#27272a",
        drawerActiveTintColor: primaryTheme.text,
        drawerStyle: {
          backgroundColor: "#18181b",
          width: "60%",
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  );
}
