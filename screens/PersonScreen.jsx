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
import { ArrowLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image500,
} from "../api/movies";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchPersonTVs } from "../api/tv";
import PosterList from "../components/PosterList";

const { width, height } = Dimensions.get("window");

export default PersonScreen = () => {
  const [personDetails, setPersonDetails] = useState();
  const [personMovies, setPersonMovies] = useState();
  const [personTVs, setPersonTVs] = useState();

  const [readMore, setReadMore] = useState(false);

  const { params: item } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    getPersonDetails(item.id);
    getPersonMovies(item.id);
    getPersonTVs(item.id);
  }, [item]);

  async function getPersonDetails(id) {
    const data = await fetchPersonDetails(id);
    if (data) setPersonDetails(data);
  }

  async function getPersonMovies(id) {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovies(data.cast);
  }

  async function getPersonTVs(id) {
    const data = await fetchPersonTVs(id);
    if (data && data.cast) setPersonTVs(data.cast);
  }

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
            uri: image500(personDetails?.profile_path) || fallbackPersonImage,
          }}
          style={{ width, height: height * 0.6 }}
          className="overflow-hidden"
        />
        <LinearGradient
          // Button Linear Gradient
          colors={[
            "rgba(9,9,11,0)",
            "rgba(9,9,11,0)",
            "rgba(9,9,11,0)",
            "rgba(9,9,11,0.6)",
            "rgba(9,9,11,1)",
          ]}
          style={{ width, height: height * 0.6 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.95 }}
          className="absolute"
        />
      </View>
      <View style={{ marginTop: height * 0.36 }} className="items-center">
        <Text className="text-[27px] text-white font-bold text-center px-3">
          {personDetails?.name}
        </Text>
        <Text className="text-base text-neutral-500 text-center px-3">
          {personDetails?.place_of_birth}
        </Text>
      </View>
      <View className="mt-8 mx-5">
        <Text className="text-lg text-white font-semibold">
          Personal Details
        </Text>
        <View>
          <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
            Gender:{" "}
            <Text className="text-neutral-300">
              {personDetails?.gender
                ? personDetails?.gender === 1
                  ? "Female"
                  : "Male"
                : "Gender not available"}
            </Text>
          </Text>
          <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
            Birthday:{" "}
            <Text className="text-neutral-300">
              {personDetails?.birthday
                ? personDetails?.birthday
                : "Birthday not available"}
            </Text>
          </Text>
          <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
            Place of Birth:{" "}
            <Text className="text-neutral-300">
              {personDetails?.place_of_birth
                ? personDetails?.place_of_birth
                : "Place of birth not available"}
            </Text>
          </Text>
          <Text className="text-neutral-500 text-[14px] leading-[18px] mt-1">
            Known For:{" "}
            <Text className="text-neutral-300">
              {personDetails?.known_for_department
                ? personDetails?.known_for_department
                : "Known for department not available"}
            </Text>
          </Text>
        </View>
        <Text className="text-lg text-white font-semibold my-3">Biography</Text>
        {personDetails?.biography?.length > 0 ? (
          <View>
            {personDetails.biography.length > 300 && !readMore ? (
              <Text className="text-neutral-500 text-[14px] leading-[18px]">
                {personDetails.biography.slice(0, 300) + "..."}
              </Text>
            ) : (
              <Text className="text-neutral-500 text-[14px] leading-[18px]">
                {personDetails.biography}
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
            Biography not available
          </Text>
        )}
      </View>
      {personMovies && (
        <PosterList title="Movies" data={personMovies} type="movie" />
      )}
      {personTVs && <PosterList title="TV Shows" data={personTVs} type="tv" />}
    </ScrollView>
  );
};
