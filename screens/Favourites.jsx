import { useNavigation } from "@react-navigation/native";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Bars3BottomLeftIcon } from "react-native-heroicons/outline";
import { primaryStyles } from "../themes/primary";
import FavouritesContext from "../store/Favourites";
import { useContext, useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/movies";
import PosterList from "../components/PosterList";

export default Favourites = () => {
  const { favouriteMovies } = useContext(FavouritesContext);

  const [movies, setMovies] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getMovies(favouriteMovies);
  }, [favouriteMovies]);

  async function getMovies(ids) {
    setMovies([]);
    for (const id of ids) {
      const data = await fetchMovieDetails(id);
      if (data) setMovies((prev) => [...prev, data]);
    }
  }

  return (
    <View className="flex-1 bg-zinc-950 pt-10">
      <SafeAreaView className="flex-row justify-between items-center mx-5 mb-3">
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Bars3BottomLeftIcon color={"white"} size={30} />
        </TouchableOpacity>
        <Text className="text-3xl font-semibold" style={primaryStyles.text}>
          Favourites
        </Text>
        <View className="opacity-0">
          <Bars3BottomLeftIcon color={"white"} size={25} strokeWidth={1.7} />
        </View>
      </SafeAreaView>
      {movies && movies.length > 0 ? (
        <PosterList title="Movies" data={movies} />
      ) : (
        <View className="ml-5">
          <Text className="text-white font-semibold text-lg">Movies</Text>
          <Text className="text-white text-base">
            You have no favourited movies
          </Text>
        </View>
      )}
    </View>
  );
};
