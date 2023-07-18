import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  ArrowLeftIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { primaryStyles } from "../themes/primary";

export default MoviesScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-zinc-950 pt-10">
      <SafeAreaView className="flex-row justify-between items-center mx-5 mb-3">
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Bars3BottomLeftIcon color={"white"} size={30} />
        </TouchableOpacity>
        <Text className="text-3xl font-semibold" style={primaryStyles.text}>
          Movies
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MagnifyingGlassIcon color={"white"} size={25} strokeWidth={1.7} />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};
