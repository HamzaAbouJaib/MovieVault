import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import { primaryTheme } from "../themes/primary";
import MoviesStack from "./MoviesStack";
import TVsStack from "./TVsStack";
import AboutScreen from "../screens/AboutScreen";
import FavouriteStack from "./FavouriteStack";

const Drawer = createDrawerNavigator();

export function AppNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#27272a",
        drawerActiveTintColor: primaryTheme.text,
        drawerInactiveTintColor: "white",
        drawerStyle: {
          backgroundColor: "#18181b",
          width: "60%",
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Movies" component={MoviesStack} />
      <Drawer.Screen name="TV Shows" component={TVsStack} />
      <Drawer.Screen name="Favourites" component={FavouriteStack} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}
