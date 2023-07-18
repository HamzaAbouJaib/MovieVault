import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { primaryStyles } from "../themes/primary";
import {
  fetchFilteredMovies,
  fetchMovieGenres,
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
} from "../api/movies";
import { useEffect, useState } from "react";
import PosterList from "../components/PosterList";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { StyleSheet } from "react-native";

export default MoviesScreen = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieYears, setMovieYears] = useState([{ id: null, year: "No year" }]);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [yearRange, setYearRange] = useState({ start: 2000, end: 1990 });

  const navigation = useNavigation();

  useEffect(() => {
    getMovieGenres();
    generateYears();
  }, []);

  useEffect(() => {
    getFilteredMovies();
  }, [selectedGenres, selectedYear]);

  async function getFilteredMovies() {
    const genres = selectedGenres.join(",");
    const data = await fetchFilteredMovies(
      genres || "",
      selectedYear.id === null ? "" : selectedYear.id
    );
    if (data && data.results) setFilteredMovies(data.results);
  }

  async function getMovieGenres() {
    const data = await fetchMovieGenres();
    if (data && data.genres) setMovieGenres(data.genres);
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
    setMovieYears((prev) => [...prev, ...years]);
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
          Movies
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MagnifyingGlassIcon color={"white"} size={25} strokeWidth={1.7} />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        <View className="mx-5">
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
        </View>
        <View className="mx-5">
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
