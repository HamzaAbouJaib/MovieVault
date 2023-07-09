import { View, Text, SafeAreaView, ScrollView } from "react-native";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { primaryStyles } from "../themes/primary";
import TrendingMoviesList from "../components/TrendingMoviesList";

export default HomeScreen = () => {
  return (
    <View className="flex-1 bg-zinc-950 pt-6">
      <SafeAreaView className="flex-row justify-between items-center mx-5">
        <Bars3BottomLeftIcon color={"white"} size={30} />
        <Text className="text-3xl font-semibold" style={primaryStyles.text}>
          Streamify
        </Text>
        <MagnifyingGlassIcon color={"white"} size={25} strokeWidth={1.7} />
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <TrendingMoviesList />
      </ScrollView>
    </View>
  );
};
