import { useNavigation } from "@react-navigation/native";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Bars3BottomLeftIcon } from "react-native-heroicons/outline";
import { primaryStyles } from "../themes/primary";

export default Favourites = () => {
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
          Favourites
        </Text>
        <View className="opacity-0">
          <Bars3BottomLeftIcon color={"white"} size={25} strokeWidth={1.7} />
        </View>
      </SafeAreaView>
    </View>
  );
};
