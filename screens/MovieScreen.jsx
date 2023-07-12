import { useRoute } from "@react-navigation/native";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import { ArrowLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import {
  fallbackMoviePoster,
  fetchMovieDetails,
  image500,
} from "../api/movies";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default MovieScreen = () => {
  const [movieDetails, setMovieDetails] = useState();

  const { params: item } = useRoute();

  useEffect(() => {
    getMovieDetails(item.id);
  }, [item]);

  async function getMovieDetails(id) {
    const data = await fetchMovieDetails(id);
    if (data) setMovieDetails(data);
  }

  return (
    <View className="flex-1 bg-zinc-950 pt-10">
      <SafeAreaView className="flex-row justify-between items-center mx-5 mb-3 z-20">
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
    </View>
  );
};
