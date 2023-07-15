import { StatusBar } from "expo-status-bar";
import AppNavigation from "./navigation/AppNavigation";
import { FavouritesContextProvider } from "./store/Favourites";

export default function App() {
  return (
    <FavouritesContextProvider>
      <AppNavigation />
      <StatusBar style="light" />
    </FavouritesContextProvider>
  );
}
