import { View, Text, SafeAreaView, ScrollView } from "react-native";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { primaryStyles } from "../themes/primary";
import TrendingMoviesList from "../components/TrendingMoviesList";
import { useEffect, useState } from "react";
import {
  fetchMovieDetails,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movies";
import PosterList from "../components/PosterList";

export default HomeScreen = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
  }, []);

  async function getUpcomingMovies() {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcomingMovies(data.results);
  }

  async function getTrendingMovies() {
    setTrendingMovies([]);
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      const length = data.results.length > 9 ? 8 : data.results.length;
      const movies = [];
      for (let i = 0; i < length; i++) {
        const data2 = await fetchMovieDetails(data.results[i].id);
        if (data2) movies.push(data2);
      }
      setTrendingMovies(movies);
    }
  }

  return (
    <View className="flex-1 bg-zinc-950 pt-6">
      <SafeAreaView className="flex-row justify-between items-center mx-5">
        <Bars3BottomLeftIcon color={"white"} size={30} />
        <Text className="text-3xl font-semibold" style={primaryStyles.text}>
          Streamify
        </Text>
        <MagnifyingGlassIcon color={"white"} size={25} strokeWidth={1.7} />
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <TrendingMoviesList movies={trendingMovies} />
        <PosterList title="Upcoming Movies" data={upcomingMovies} />
      </ScrollView>
    </View>
  );
};
