import { useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { primaryStyles } from "../themes/primary";

const { width, height } = Dimensions.get("window");

export default TrendingMoviesList = () => {
  const [trendingMovies, setTrendingMovies] = useState([1, 2, 3, 4]);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  return (
    <View>
      <Text className="text-white text-lg font-semibold mb-3 ml-5">
        Now Trending
      </Text>
      <Carousel
        data={trendingMovies}
        renderItem={({ item }) => (
          <View style={{ height: height * 0.3 }}>
            <Image
              source={require("../assets/testImages/moviePoster1.png")}
              style={{ width: width * 0.95 }}
              className="overflow-hidden"
            />
          </View>
        )}
        firstItem={0}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.95}
        slideStyle={{ display: "flex", alignItems: "flex-start" }}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />
      <Pagination
        containerStyle={{ marginTop: -16 }}
        dotsLength={trendingMovies.length + 1}
        activeDotIndex={activeDotIndex}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: 2,
          ...primaryStyles.background,
        }}
        inactiveDotStyle={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};
