import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  ArrowLeftIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { primaryStyles } from "../themes/primary";
import {
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movies";
import { useEffect, useState } from "react";
import PosterList from "../components/PosterList";

export default MoviesScreen = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getTopRatedMovies();
    getNowPlayingMovies();
  }, []);

  async function getTopRatedMovies() {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRatedMovies(data.results);
  }

  async function getTrendingMovies() {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrendingMovies(data.results);
  }

  async function getNowPlayingMovies() {
    const data = await fetchNowPlayingMovies();
    if (data && data.results) setNowPlayingMovies(data.results);
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
          Movies
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MagnifyingGlassIcon color={"white"} size={25} strokeWidth={1.7} />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        <PosterList title="Now in Theatres" data={nowPlayingMovies} />
        <PosterList title="Trending" data={trendingMovies} />
        <PosterList title="Top Rated" data={topRatedMovies} />
      </ScrollView>
    </View>
  );
};
