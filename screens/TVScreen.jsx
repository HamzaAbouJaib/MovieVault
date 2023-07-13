import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  ArrowLeftIcon,
  HeartIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/movies";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CastList from "../components/CastList";
import PosterList from "../components/PosterList";
import { fetchSimilarTVs, fetchTVCredits, fetchTVDetails } from "../api/tv";

const { width, height } = Dimensions.get("window");

export default TVScreen = () => {
  const [TVDetails, setTVDetails] = useState();
  const [TVCast, setTVCast] = useState();
  const [similarTVs, setSimilarTVs] = useState();

  const { params: item } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    getTVDetails(item.id);
    getTVCredits(item.id);
    getSimilarTVs(item.id);
  }, [item]);

  async function getTVDetails(id) {
    const data = await fetchTVDetails(id);
    if (data) setTVDetails(data);
  }

  async function getTVCredits(id) {
    const data = await fetchTVCredits(id);
    if (data && data.cast) setTVCast(data.cast);
  }

  async function getSimilarTVs(id) {
    const data = await fetchSimilarTVs(id);
    if (data && data.results) setSimilarTVs(data.results);
  }

  console.log(TVDetails);

  return (
    <ScrollView className="flex-1 bg-zinc-950">
      <SafeAreaView className="flex-row justify-between items-center mx-5 mb-3 z-20 mt-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className="bg-neutral-800 rounded-full p-2">
            <ArrowLeftIcon color={"white"} size={25} strokeWidth={1.7} />
          </View>
        </TouchableOpacity>
        <View className="bg-neutral-800 rounded-full p-2">
          <HeartIcon color={"white"} size={25} strokeWidth={1.7} />
        </View>
      </SafeAreaView>
      <View className="absolute" style={{ height: height * 0.6 }}>
        <Image
          source={{
            uri: image500(TVDetails?.poster_path) || fallbackMoviePoster,
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
          {TVDetails?.name}
        </Text>
        <Text className="text-base text-neutral-500 text-center px-3">
          {TVDetails?.status} • {TVDetails?.first_air_date?.split("-")[0]} •{" "}
          {TVDetails?.number_of_seasons} Seasons
        </Text>
        <View className="flex-row items-center px-3 gap-1">
          <StarIcon color={"yellow"} fill={"yellow"} size={20} />
          <Text className="text-base text-white font-semibold">
            {Number.parseFloat(TVDetails?.vote_average).toFixed(1)}/10{" "}
          </Text>
          <Text className="text-xs text-neutral-500">
            (
            {TVDetails?.vote_count > 999
              ? (Math.abs(TVDetails?.vote_count) / 1000).toFixed(1) + "k"
              : TVDetails?.vote_count}{" "}
            Reviews)
          </Text>
        </View>
      </View>
      <View className="mt-8 mx-5">
        {/* <Text className="text-lg text-white font-semibold">Synopsis</Text> */}
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-3">
          {TVDetails?.overview?.length > 0
            ? TVDetails?.overview
            : "Synopsis not available"}
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-3">
          Type: <Text className="text-neutral-300">TV Show</Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Country:{" "}
          <Text className="text-neutral-300">
            {TVDetails?.production_countries[0]?.name}
          </Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Genres:{" "}
          {TVDetails?.genres.map((genre, index) => (
            <Text key={index} className="text-neutral-300">
              {genre?.name +
                (index === TVDetails?.genres?.length - 1 ? "" : ", ")}
            </Text>
          ))}
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          First Air Date:{" "}
          <Text className="text-neutral-300">{TVDetails?.first_air_date}</Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Last Air Date:{" "}
          <Text className="text-neutral-300">{TVDetails?.last_air_date}</Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Episodes:{" "}
          <Text className="text-neutral-300">
            {TVDetails?.number_of_episodes}
          </Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Seasons:{" "}
          <Text className="text-neutral-300">
            {TVDetails?.number_of_seasons}
          </Text>
        </Text>
      </View>
      {TVCast && <CastList cast={TVCast} />}
      {similarTVs && <PosterList title="Similar TV Shows" data={similarTVs} />}
    </ScrollView>
  );
};
