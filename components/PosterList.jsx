import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { image185 } from "../api/movies";

const { width, height } = Dimensions.get("window");

export default PosterList = ({ title, data }) => {
  return (
    <View className="ml-5 mb-5">
      <Text className="text-white font-semibold text-lg">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12 }}
      >
        {data.map((item, index) => (
          <View className="space-y-1 mr-4" key={index}>
            <Image
              source={{
                uri: image185(item.poster_path) || fallbackMoviePoster,
              }}
              style={{
                width: width * 0.3,
                height: height * 0.2,
                borderRadius: 8,
              }}
            />
            <Text className="text-neutral-300 ml-1">
              {item.title.length > 15
                ? item.title.slice(0, 15) + "..."
                : item.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
