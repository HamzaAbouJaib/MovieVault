import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import {
  fallbackMoviePoster,
  fetchSearchedMovies,
  image185,
} from "../api/movies";
import { fetchSearchedTVs } from "../api/tv";
import { Image } from "react-native";

const { width, height } = Dimensions.get("window");

export default SearchScreen = () => {
  const [movieSearchResults, setMovieSearchResults] = useState([]);
  const [TVSearchResults, setTVSearchResults] = useState([]);

  const navigation = useNavigation();

  function searchHandler(query) {
    if (query && query.length > 0) {
      fetchSearchedMovies(query).then((data) => {
        if (data && data.results) {
          setMovieSearchResults(data.results);
        }
      });
      fetchSearchedTVs(query).then((data) => {
        if (data && data.results) {
          setTVSearchResults(data.results);
        }
      });
    }
  }

  const textDebounceHandler = useCallback(debounce(searchHandler, 400), []);

  return (
    <View className="flex-1 bg-zinc-950">
      <SafeAreaView className="flex-row justify-between items-center mx-5 mb-3 z-20 mt-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className="bg-neutral-800 rounded-full p-2">
            <ArrowLeftIcon color={"white"} size={25} strokeWidth={1.7} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <View>
        <TextInput
          onChangeText={textDebounceHandler}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          className="border border-neutral-500 text-neutral-300 rounded-full py-2 px-4 text-base mt-2 mx-5"
        />
      </View>
      {movieSearchResults?.length > 0 || TVSearchResults?.length > 0 ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
              marginHorizontal: 20,
              marginTop: 10,
            }}
            className="space-y-3"
          >
            <Text className="text-white font-semibold">
              Results ({TVSearchResults.concat(movieSearchResults).length})
            </Text>
            <View className="flex-row justify-between flex-wrap">
              {TVSearchResults.concat(movieSearchResults).map(
                (result, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() =>
                      navigation.push(
                        result.title ? "MovieDetails" : "TVDetails",
                        result
                      )
                    }
                  >
                    <View className="space-y-1 mb-4">
                      <Image
                        className="rounded-3xl"
                        source={{
                          uri:
                            image185(result.poster_path) || fallbackMoviePoster,
                        }}
                        style={{ width: width * 0.38, height: height * 0.28 }}
                      />
                      <Text className="text-neutral-400 ml-1">
                        {result?.title
                          ? result?.title?.length > 20
                            ? result?.title?.slice(0, 20) + "..."
                            : result?.title
                          : result?.name?.length > 20
                          ? result?.name?.slice(0, 20) + "..."
                          : result?.name}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      ) : (
        <Text className="text-neutral-300 text-base ml-5 mt-2">
          There are no results
        </Text>
      )}
    </View>
  );
};
