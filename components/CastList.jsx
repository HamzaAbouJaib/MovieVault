import { Image, TouchableOpacity } from "react-native";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fallbackPersonImage, image185 } from "../api/shared";

export default CastList = ({ cast }) => {
  const navigation = useNavigation();

  return (
    <View className="ml-5 my-5">
      <Text className="text-white font-semibold text-lg">Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12 }}
      >
        {cast.map((item, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonDetails", item)}
            className="mr-4 items-center"
            key={index}
          >
            <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
              <Image
                source={{
                  uri: image185(item.profile_path) || fallbackPersonImage,
                }}
                className="h-24 w-20"
              />
            </View>
            <Text className="text-neutral-200 text-center mt-1">
              {item?.character?.length > 10
                ? item?.character?.slice(0, 10) + "..."
                : item?.character}
            </Text>
            <Text className="text-neutral-500 text-center text-xs leading-4">
              {item?.original_name?.length > 10
                ? item?.original_name?.slice(0, 10) + "..."
                : item?.original_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
