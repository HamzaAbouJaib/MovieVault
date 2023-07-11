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
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movies";
import PosterList from "../components/PosterList";
import { fetchAiringTodayTVs } from "../api/tv";

export default HomeScreen = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [airingTodayTVs, setAiringTodayTVs] = useState([]);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getAiringTodayTVs();
  }, []);

  async function getAiringTodayTVs() {
    const data = await fetchAiringTodayTVs();
    if (data && data.results) setAiringTodayTVs(data.results);
  }

  async function getUpcomingMovies() {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcomingMovies(data.results);
  }

  async function getTopRatedMovies() {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRatedMovies(data.results);
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
    <View className="flex-1 bg-zinc-950 pt-7">
      <SafeAreaView className="flex-row justify-between items-center mx-5 mb-3">
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
        }}
      >
        <TrendingMoviesList movies={trendingMovies} />
        <PosterList title="Upcoming Movies" data={upcomingMovies} />
        <PosterList title="Top Rated Movies" data={topRatedMovies} />
        <PosterList title="Airing Today TV Series" data={airingTodayTVs} />
      </ScrollView>
    </View>
  );
};
