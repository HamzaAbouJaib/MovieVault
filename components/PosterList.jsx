import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/shared";

const { width, height } = Dimensions.get("window");

export default PosterList = ({ title, data }) => {
  const navigation = useNavigation();

  return (
    <View className="ml-5 mb-5">
      <Text className="text-white font-semibold text-lg">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              navigation.push(item.title ? "MovieDetails" : "TVDetails", item);
            }}
          >
            <View className="space-y-1 mr-4">
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
                {item.title
                  ? item.title.length > 15
                    ? item.title.slice(0, 15) + "..."
                    : item.title
                  : item.name.length > 15
                  ? item.name.slice(0, 15) + "..."
                  : item.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};
