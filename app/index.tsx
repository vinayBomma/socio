import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoogleAuth from "@/components/GoogleAuth";
import getGPTResponse from "@/lib/gpt.ts";
import supabase from "@/lib/supabase.ts";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {});
  const handleGuestLogin = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();
    console.log("data", data);
    if (data) {
      router.push("/home");
    }
  };

  const handleNotification = async () => {
    console.log("handleNotification");
    await schedulePushNotification();
  };

  async function schedulePushNotification() {
    const data = await getGPTResponse(
      "User has consistently being exercising since 5 days"
    );
    console.log("data", data);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: data,
      },
      trigger: null,
    });
  }

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
      <TouchableOpacity onPress={handleNotification}>
        <Text className="text-xl m-3">Send Notifications</Text>
      </TouchableOpacity>
    </View>
  );
}
