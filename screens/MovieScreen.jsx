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
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
} from "../api/movies";
import { useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CastList from "../components/CastList";
import PosterList from "../components/PosterList";
import { fallbackMoviePoster, image500 } from "../api/shared";
import FavouritesContext from "../store/Favourites";

const { width, height } = Dimensions.get("window");

export default MovieScreen = () => {
  const [movieDetails, setMovieDetails] = useState();
  const [movieCast, setMovieCast] = useState();
  const [similarMovies, setSimilarMovies] = useState();

  const [readMore, setReadMore] = useState(false);

  const { favouriteMovies, addFavouriteMovies, removeFavouriteMovies } =
    useContext(FavouritesContext);

  const { params: item } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  async function getMovieDetails(id) {
    const data = await fetchMovieDetails(id);
    if (data) setMovieDetails(data);
  }

  async function getMovieCredits(id) {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setMovieCast(data.cast);
  }

  async function getSimilarMovies(id) {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
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
            if (favouriteMovies.includes(item.id)) {
              removeFavouriteMovies(item.id);
            } else {
              addFavouriteMovies(item.id);
            }
          }}
        >
          <View className="bg-neutral-800 rounded-full p-2">
            <HeartIcon
              color={favouriteMovies.includes(item.id) ? "red" : "white"}
              size={25}
              strokeWidth={1.7}
            />
          </View>
        </TouchableOpacity>
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
            {movieDetails?.vote_count > 999
              ? (Math.abs(movieDetails?.vote_count) / 1000).toFixed(1) + "k"
              : movieDetails?.vote_count}{" "}
            Reviews)
          </Text>
        </View>
      </View>
      <View className="mt-8 mx-5">
        {/* <Text className="text-lg text-white font-semibold">Synopsis</Text> */}
        {movieDetails?.overview?.length > 0 ? (
          <View>
            {movieDetails.overview.length > 300 && !readMore ? (
              <Text className="text-neutral-500 text-[14px] leading-[18px]">
                {movieDetails.overview.slice(0, 300) + "..."}
              </Text>
            ) : (
              <Text className="text-neutral-500 text-[14px] leading-[18px]">
                {movieDetails.overview}
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
          Type: <Text className="text-neutral-300">Movie</Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Country:{" "}
          <Text className="text-neutral-300">
            {movieDetails?.production_countries?.length > 0
              ? movieDetails?.production_countries[0]?.name
              : "Country not available"}
          </Text>
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Production:{" "}
          {movieDetails?.production_companies?.length > 0 ? (
            movieDetails?.production_companies.map((company, index) => (
              <Text key={index} className="text-neutral-300">
                {company?.name +
                  (index === movieDetails?.production_companies?.length - 1
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
          {movieDetails?.genres?.length > 0 ? (
            movieDetails?.genres.map((genre, index) => (
              <Text key={index} className="text-neutral-300">
                {genre?.name +
                  (index === movieDetails?.genres?.length - 1 ? "" : ", ")}
              </Text>
            ))
          ) : (
            <Text className="text-neutral-300">Genres not available</Text>
          )}
        </Text>
        <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
          Release Date:{" "}
          <Text className="text-neutral-300">
            {movieDetails?.release_date
              ? movieDetails?.release_date
              : "Release date not available"}
          </Text>
        </Text>
      </View>
      {movieCast && <CastList cast={movieCast} />}
      {similarMovies && (
        <PosterList title="Similar Movies" data={similarMovies} />
      )}
    </ScrollView>
  );
};
