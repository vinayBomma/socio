import { Link } from "expo-router";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-400">
      <Text className="text-3xl">Social Habits</Text>
      <StatusBar style="auto" />
      <Link className="text-xl" href="/home">
        Open Home
      </Link>
    </View>
  );
}
