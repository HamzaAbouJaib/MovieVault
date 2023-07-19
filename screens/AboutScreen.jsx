import { useNavigation } from "@react-navigation/native";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Bars3BottomLeftIcon } from "react-native-heroicons/outline";
import { primaryStyles } from "../themes/primary";

export default AboutScreen = () => {
  const navigation = useNavigation();

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
          About
        </Text>
        <View className="opacity-0">
          <Bars3BottomLeftIcon color={"white"} size={25} strokeWidth={1.7} />
        </View>
      </SafeAreaView>
      <View className="ml-5">
        <Text className="text-white">
          This app is build using the TMDB API. This product uses the TMDB API
          but is not endorsed or certified by TMDB.
        </Text>
      </View>
    </View>
  );
};
