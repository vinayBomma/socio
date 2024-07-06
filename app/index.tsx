import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoogleAuth from "@/components/GoogleAuth";
import { supabase } from "@/lib/supabase";

export default function App() {
  const handleGuestLogin = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();
    console.log(data, error);
  };
  return (
    <View className="flex-1 items-center justify-center bg-slate-400">
      <Text className="text-3xl">Social Habits</Text>
      <StatusBar style="auto" />
      <GoogleAuth />
      <TouchableOpacity
        onPress={handleGuestLogin}
        className="bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded m-2"
      >
        <Text className="text-xl m-3 text-white">Continue as Guest</Text>
      </TouchableOpacity>
      <Link className="text-xl" href="/home">
        Open Tabs
      </Link>
    </View>
  );
}
