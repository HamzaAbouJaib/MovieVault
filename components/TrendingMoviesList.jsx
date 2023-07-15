import { useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { primaryStyles } from "../themes/primary";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/shared";

const { width, height } = Dimensions.get("window");

export default TrendingMoviesList = ({ movies }) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const navigation = useNavigation();

  return (
    <View>
      <Text className="text-white text-lg font-semibold mb-3 ml-5">
        Now Trending
      </Text>
      <Carousel
        data={movies}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("MovieDetails", item)}
            >
              <View style={{ height: height * 0.3 }}>
                <Image
                  source={{
                    uri: image500(item.backdrop_path),
                  }}
                  style={{ width: width * 0.95, height: height * 0.3 }}
                  resizeMode="cover"
                  className="overflow-hidden"
                />
                <LinearGradient
                  // Button Linear Gradient
                  colors={[
                    "transparent",
                    "rgba(24,24,27,0.7)",
                    "rgba(24,24,27,0.9)",
                    "rgba(24,24,27,1)",
                  ]}
                  style={{ width, height: height * 0.3 }}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  className="absolute"
                />
                <View className="absolute bottom-0 mb-4 ml-5 z-20">
                  <View>
                    <Text
                      className="text-white text-lg font-semibold leading-5"
                      style={{ width: width * 0.8 }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      className="text-neutral-500 font-semibold"
                      style={{ fontSize: 12.5 }}
                    >
                      {item.release_date?.split("-")[0]} • {item.genres[0].name}{" "}
                      • {item.runtime} min
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        firstItem={0}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.95}
        slideStyle={{ display: "flex", alignItems: "flex-start" }}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />
      <Pagination
        containerStyle={{ marginTop: -16 }}
        dotsLength={movies.length}
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
