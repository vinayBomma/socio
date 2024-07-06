import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoogleAuth from "@/components/GoogleAuth";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-400">
      <Text className="text-3xl">Social Habits</Text>
      <StatusBar style="auto" />
      <GoogleAuth />
      <Link className="text-xl" href="/home">
        Open Tabs
      </Link>
    </View>
  );
}
