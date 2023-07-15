import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import {
  ArrowLeftIcon,
  HeartIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import { useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CastList from "../components/CastList";
import PosterList from "../components/PosterList";
import { fetchSimilarTVs, fetchTVCredits, fetchTVDetails } from "../api/tv";
import { fallbackMoviePoster, image500 } from "../api/shared";
import FavouritesContext from "../store/Favourites";

const { width, height } = Dimensions.get("window");

export default TVScreen = () => {
  const [TVDetails, setTVDetails] = useState();
  const [TVCast, setTVCast] = useState();
  const [similarTVs, setSimilarTVs] = useState();

  const { favouriteTVs, addFavouriteTVs, removeFavouriteTVs } =
    useContext(FavouritesContext);

  const [readMore, setReadMore] = useState(false);

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

  return (
    <ScrollView className="flex-1 bg-zinc-950">
      <SafeAreaView className="flex-row justify-between items-center mx-5 mb-3 z-20 mt-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className="bg-neutral-800 rounded-full p-2">
            <ArrowLeftIcon color={"white"} size={25} strokeWidth={1.7} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (favouriteTVs.includes(item.id)) {
              removeFavouriteTVs(item.id);
            } else {
              addFavouriteTVs(item.id);
            }
          }}
        >
          <View className="bg-neutral-800 rounded-full p-2">
            <HeartIcon
              color={favouriteTVs.includes(item.id) ? "red" : "white"}
              size={25}
              strokeWidth={1.7}
            />
          </View>
        </TouchableOpacity>
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
        {TVDetails?.overview?.length > 0 ? (
          <View>
            {TVDetails.overview.length > 300 && !readMore ? (
              <Text className="text-neutral-500 text-[14px] leading-[18px]">
                {TVDetails.overview.slice(0, 300) + "..."}
              </Text>
            ) : (
              <Text className="text-neutral-500 text-[14px] leading-[18px]">
                {TVDetails.overview}
              </Text>
            )}

            <TouchableHighlight onPress={() => setReadMore((prev) => !prev)}>
              <Text className="text-neutral-300 text-center mt-1 text-base">
                {readMore ? "Read less" : "Read more"}
              </Text>
            </TouchableHighlight>
          </View>
        ) : (
          <Text className="text-neutral-500 text-[14px] leading-[18px]">
            Synopsis not available
          </Text>
        )}
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-3">
          Type: <Text className="text-neutral-300">TV Show</Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Country:{" "}
          <Text className="text-neutral-300">
            {TVDetails?.production_countries?.length > 0
              ? TVDetails?.production_countries[0]?.name
              : "Country not available"}
          </Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Production:{" "}
          {TVDetails?.production_companies?.length > 0 ? (
            TVDetails?.production_companies.map((company, index) => (
              <Text key={index} className="text-neutral-300">
                {company?.name +
                  (index === TVDetails?.production_companies?.length - 1
                    ? ""
                    : ", ")}
              </Text>
            ))
          ) : (
            <Text className="text-neutral-300">
              Production companies not available
            </Text>
          )}
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Genres:{" "}
          {TVDetails?.genres?.length > 0 ? (
            TVDetails?.genres.map((genre, index) => (
              <Text key={index} className="text-neutral-300">
                {genre?.name +
                  (index === TVDetails?.genres?.length - 1 ? "" : ", ")}
              </Text>
            ))
          ) : (
            <Text className="text-neutral-300">Genres not available</Text>
          )}
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          First Air Date:{" "}
          <Text className="text-neutral-300">
            {TVDetails?.first_air_date
              ? TVDetails?.first_air_date
              : "First air date not available"}
          </Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Last Air Date:{" "}
          <Text className="text-neutral-300">
            {TVDetails?.last_air_date
              ? TVDetails?.last_air_date
              : "Last air date not available"}
          </Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Episodes:{" "}
          <Text className="text-neutral-300">
            {TVDetails?.number_of_episodes
              ? TVDetails?.number_of_episodes
              : "Number of episodes not available"}
          </Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Seasons:{" "}
          <Text className="text-neutral-300">
            {TVDetails?.number_of_seasons
              ? TVDetails?.number_of_seasons
              : "Number of seasons not available"}
          </Text>
        </Text>
      </View>
      {TVCast && <CastList cast={TVCast} />}
      {similarTVs && <PosterList title="Similar TV Shows" data={similarTVs} />}
    </ScrollView>
  );
};
