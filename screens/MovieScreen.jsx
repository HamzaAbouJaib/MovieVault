import { useRoute } from "@react-navigation/native";
import { View, Text, SafeAreaView, Dimensions, ScrollView } from "react-native";
import {
  ArrowLeftIcon,
  HeartIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  image500,
} from "../api/movies";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CastList from "../components/CastList";

const { width, height } = Dimensions.get("window");

export default MovieScreen = () => {
  const [movieDetails, setMovieDetails] = useState();
  const [movieCast, setMovieCast] = useState();

  const { params: item } = useRoute();

  useEffect(() => {
    getMovieDetails(item.id);
    getMovieCredits(item.id);
  }, [item]);

  async function getMovieDetails(id) {
    const data = await fetchMovieDetails(id);
    if (data) setMovieDetails(data);
  }

  async function getMovieCredits(id) {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setMovieCast(data.cast);
  }

  return (
    <ScrollView className="flex-1 bg-zinc-950">
      <SafeAreaView className="flex-row justify-between items-center mx-5 mb-3 z-20 mt-10">
        <View className="bg-neutral-800 rounded-full p-2">
          <ArrowLeftIcon color={"white"} size={25} strokeWidth={1.7} />
        </View>
        <View className="bg-neutral-800 rounded-full p-2">
          <HeartIcon color={"white"} size={25} strokeWidth={1.7} />
        </View>
      </SafeAreaView>
      <View className="absolute" style={{ height: height * 0.6 }}>
        <Image
          source={{
            uri: image500(movieDetails?.poster_path) || fallbackMoviePoster,
          }}
          style={{ width, height: height * 0.6 }}
          className="overflow-hidden"
        />
        <LinearGradient
          // Button Linear Gradient
          colors={["rgba(9,9,11,0.2)", "rgba(9,9,11,1)"]}
          style={{ width, height: height * 0.6 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.95 }}
          className="absolute"
        />
      </View>
      <View style={{ marginTop: height * 0.32 }} className="items-center">
        <Text className="text-[27px] text-white font-bold text-center px-3">
          {movieDetails?.title}
        </Text>
        <Text className="text-base text-neutral-500 text-center px-3">
          {movieDetails?.status} • {movieDetails?.release_date?.split("-")[0]} •{" "}
          {movieDetails?.runtime} min
        </Text>
        <View className="flex-row items-center px-3 gap-1">
          <StarIcon color={"yellow"} fill={"yellow"} size={20} />
          <Text className="text-base text-white font-semibold">
            {Number.parseFloat(movieDetails?.vote_average).toFixed(1)}/10{" "}
          </Text>
          <Text className="text-xs text-neutral-500">
            (
            {movieDetails?.vote_count.length > 3
              ? movieDetails?.vote_count[0] +
                "." +
                movieDetails?.vote_count[1] +
                "k"
              : movieDetails?.vote_count}{" "}
            Reviews)
          </Text>
        </View>
      </View>
      <View className="mt-8 mx-5">
        <Text className="text-lg text-white font-semibold">Synopsis</Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-3">
          {movieDetails?.overview}
        </Text>
      </View>
      {movieCast && <CastList cast={movieCast} />}
    </ScrollView>
  );
};
