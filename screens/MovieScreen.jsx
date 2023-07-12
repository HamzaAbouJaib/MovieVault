import { useRoute } from "@react-navigation/native";
import { View, Text, SafeAreaView } from "react-native";
import { ArrowLeftIcon, HeartIcon } from "react-native-heroicons/outline";

export default MovieScreen = () => {
  const { params: item } = useRoute();

  return (
    <View className="flex-1 bg-zinc-950 pt-12">
      <SafeAreaView className="flex-row justify-between items-center mx-5 mb-3">
        <View className="bg-neutral-600 rounded-full p-2">
          <ArrowLeftIcon color={"white"} size={25} strokeWidth={1.7} />
        </View>
        <View className="bg-neutral-600 rounded-full p-2">
          <HeartIcon color={"white"} size={25} strokeWidth={1.7} />
        </View>
      </SafeAreaView>
      <Text>{item.title}</Text>
    </View>
  );
};
