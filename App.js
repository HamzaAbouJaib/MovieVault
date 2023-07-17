import { StatusBar } from "expo-status-bar";
import MainNavigation from "./navigation/MainNavigation";
import { FavouritesContextProvider } from "./store/Favourites";

export default function App() {
  return (
    <FavouritesContextProvider>
      <MainNavigation />
      <StatusBar style="light" />
    </FavouritesContextProvider>
  );
}
