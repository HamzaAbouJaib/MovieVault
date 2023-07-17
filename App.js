import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { FavouritesContextProvider } from "./store/Favourites";
import { AppNavigation } from "./navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <FavouritesContextProvider>
      <NavigationContainer>
        <AppNavigation />
        <StatusBar style="light" />
      </NavigationContainer>
    </FavouritesContextProvider>
  );
}
