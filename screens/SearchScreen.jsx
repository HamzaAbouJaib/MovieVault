import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export default SearchScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-zinc-950">
      <SafeAreaView className="flex-row justify-between items-center mx-5 mb-3 z-20 mt-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className="bg-neutral-800 rounded-full p-2">
            <ArrowLeftIcon color={"white"} size={25} strokeWidth={1.7} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <View>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#aaa"
          className="border border-neutral-500 text-neutral-300 rounded-full py-2 px-4 text-base mt-2 mx-5"
        />
      </View>
    </ScrollView>
  );
};
