import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  return (
    <>
      <AppNavigation />
      <StatusBar style="light" />
    </>
  );
}
