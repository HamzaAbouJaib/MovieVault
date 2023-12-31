import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { primaryStyles } from "../themes/primary";
import { fetchFilteredTVs, fetchTVGenres } from "../api/tv";
import { useEffect, useState } from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { fallbackMoviePoster, image185 } from "../api/shared";

const { width, height } = Dimensions.get("window");

export default TVsScreen = () => {
  const [filteredTVs, setFilteredTVs] = useState([]);
  const [movieGenres, setTVGenres] = useState([]);
  const [movieYears, setTVYears] = useState([{ id: null, year: "No year" }]);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [yearRange, setYearRange] = useState({ start: 2000, end: 1990 });

  const navigation = useNavigation();

  useEffect(() => {
    getTVGenres();
    generateYears();
  }, []);

  useEffect(() => {
    getFilteredTVs();
  }, [selectedGenres, selectedYear]);

  async function getFilteredTVs() {
    const genres = selectedGenres.join(",");
    const data = await fetchFilteredTVs(
      genres || "",
      selectedYear?.id === null ? "" : selectedYear?.id
    );
    if (data && data.results) setFilteredTVs(data.results);
  }

  async function getTVGenres() {
    const data = await fetchTVGenres();
    if (data && data.genres) setTVGenres(data.genres);
  }

  function generateYears(startYear = 2023, endYear = 2001) {
    if (endYear === 1950) {
      setIsLoading(false);
      return;
    }

    const years = [];
    for (let i = startYear; i >= endYear; i--) {
      years.push({ id: i.toString(), year: i.toString() });
    }
    setTVYears((prev) => [...prev, ...years]);
    setIsLoading(false);
  }

  const RenderFooter = ({ isLoading }) => {
    if (!isLoading) {
      return null;
    }
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator color={"gray"} size={"large"} />
      </View>
    );
  };

  const onLoadMore = () => {
    setIsLoading(true);
    generateYears(yearRange.start, yearRange.end);
    setYearRange((prev) => {
      return { start: prev.start - 11, end: prev.end - 10 };
    });
  };

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
          TV Shows
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MagnifyingGlassIcon color={"white"} size={25} strokeWidth={1.7} />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          marginHorizontal: 20,
        }}
      >
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={movieGenres}
          labelField="name"
          valueField="id"
          placeholder="Select genres..."
          value={selectedGenres}
          onChange={(item) => {
            setSelectedGenres(item);
          }}
          itemTextStyle={{ color: "white" }}
          selectedStyle={styles.selectedStyle}
          itemContainerStyle={{
            backgroundColor: "#18181b",
            borderWidth: 1,
            borderColor: "#18181b",
          }}
          activeColor="#3f3f46"
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={movieYears}
          labelField="year"
          valueField="id"
          placeholder="Select release year..."
          value={selectedYear}
          onChange={(item) => {
            setSelectedYear(item);
          }}
          itemTextStyle={{ color: "white" }}
          selectedStyle={styles.selectedStyle}
          itemContainerStyle={{
            backgroundColor: "#18181b",
            borderWidth: 1,
            borderColor: "#18181b",
          }}
          activeColor="#3f3f46"
          flatListProps={{
            ListFooterComponent: <RenderFooter isLoading={isLoading} />,
            onEndReachedThreshold: 0.5,
            onEndReached: onLoadMore,
          }}
        />
        <View className="flex-row justify-between flex-wrap mx-3 mt-8">
          {filteredTVs.map((result, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("TVDetails", result)}
            >
              <View className="space-y-1 mb-4">
                <Image
                  className="rounded-3xl"
                  source={{
                    uri: image185(result.poster_path) || fallbackMoviePoster,
                  }}
                  style={{ width: width * 0.38, height: height * 0.28 }}
                />
                <Text className="text-neutral-400 ml-1">
                  {result?.name?.length > 20
                    ? result?.name?.slice(0, 20) + "..."
                    : result?.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "white",
  },
  inputSearchStyle: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#18181b",
  },
  selectedStyle: {
    color: "white",
    backgroundColor: "#18181b",
    borderWidth: 1,
    borderColor: "#3f3f46",
  },
  footerContainer: {
    padding: 16,
    alignItems: "center",
  },
});
