import { StatusBar } from "expo-status-bar";
import HomeStack from "./navigation/HomeStack";
import { FavouritesContextProvider } from "./store/Favourites";

export default function App() {
  return (
    <FavouritesContextProvider>
      <HomeStack />
      <StatusBar style="light" />
    </FavouritesContextProvider>
  );
}
