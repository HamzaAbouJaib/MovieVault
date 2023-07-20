import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import { Bars3BottomLeftIcon } from "react-native-heroicons/outline";
import { primaryStyles } from "../themes/primary";
import FavouritesContext from "../store/Favourites";
import { useContext, useEffect, useState } from "react";
import { fetchMovieDetails, fetchPersonDetails } from "../api/movies";
import PosterList from "../components/PosterList";
import { fetchTVDetails } from "../api/tv";
import { fallbackPersonImage, image185 } from "../api/shared";
import { Image } from "react-native";

const { width, height } = Dimensions.get("window");

export default Favourites = () => {
  const { favouriteMovies, favouriteTVs, favouritePeople } =
    useContext(FavouritesContext);

  const [movies, setMovies] = useState([]);
  const [TVs, setTVs] = useState([]);
  const [people, setPeople] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getMovies(favouriteMovies);
    getTVs(favouriteTVs);
    getPeople(favouritePeople);
  }, [favouriteMovies, favouriteTVs, favouritePeople]);

  async function getMovies(ids) {
    setMovies([]);
    for (const id of ids) {
      const data = await fetchMovieDetails(id);
      if (data) setMovies((prev) => [...prev, data]);
    }
  }

  async function getTVs(ids) {
    setTVs([]);
    for (const id of ids) {
      const data = await fetchTVDetails(id);
      if (data) setTVs((prev) => [...prev, data]);
    }
  }

  async function getPeople(ids) {
    setPeople([]);
    for (const id of ids) {
      const data = await fetchPersonDetails(id);
      if (data) setPeople((prev) => [...prev, data]);
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
          <Text className="text-neutral-300 mb-5">
            You have no favourited movies
          </Text>
        </View>
      )}
      {TVs && TVs.length > 0 ? (
        <PosterList title="TV Shows" data={TVs} />
      ) : (
        <View className="ml-5">
          <Text className="text-white font-semibold text-lg">TV Shows</Text>
          <Text className="text-neutral-300 mb-5">
            You have no favourited TV shows
          </Text>
        </View>
      )}
      <View className="ml-5 mb-5">
        <Text className="text-white font-semibold text-lg">Cast</Text>
        {people && people.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 12 }}
          >
            {people.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  navigation.push("PersonDetails", item);
                }}
              >
                <View className="space-y-1 mr-4">
                  <Image
                    source={{
                      uri: image185(item.profile_path) || fallbackPersonImage,
                    }}
                    style={{
                      width: width * 0.3,
                      height: height * 0.2,
                      borderRadius: 8,
                    }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {item.name.length > 15
                      ? item.name.slice(0, 15) + "..."
                      : item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        ) : (
          <Text className="text-neutral-300">
            You have no favourited cast members
          </Text>
        )}
      </View>
    </View>
  );
};
