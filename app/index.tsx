import { Link, router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoogleAuth from "@/components/GoogleAuth";
import getGPTResponse from "@/lib/gpt.ts";
import supabase from "@/lib/supabase.ts";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import getGeminiResponse from "@/lib/gemini";
import { MaterialCommunityIcons } from "@expo/vector-icons";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        router.push("/home");
      }
    };
    fetchUser();
  });
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
    // const data = await getGPTResponse(
    //   "User has consistently being exercising since 5 days"
    // );
    const data = await getGeminiResponse(
      "User has consistently being exercising since 5 days. Give a short funny and quirky response. Be positive"
    );
    console.log("data", data);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: data,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        sound: "notification.wav",
      },
      trigger: null,
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center justify-start p-2 h-3/5">
        <View className="flex-row justify-around">
          <Image
            className="w-60 h-60"
            source={require("./../assets/exercise.png")}
            resizeMode="contain"
          />
          <Image
            className="w-48 h-56"
            source={require("./../assets/rockstar.png")}
            resizeMode="contain"
          />
        </View>
        <View className="flex-row justify-around">
          <Image
            className="w-60 h-60"
            source={require("./../assets/meditation.png")}
            resizeMode="contain"
          />
          <Image
            className="w-48 h-56"
            source={require("./../assets/read.png")}
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="bg-black flex-1 p-5 h-2/5">
        <Text className="text-xl text-white text-center font-semibold">
          Build Better Habits, Together.
        </Text>
        <View className="mt-5">
          <GoogleAuth />
          <TouchableOpacity
            onPress={handleGuestLogin}
            className="bg-white rounded m-2 flex-row items-center justify-center"
          >
            <MaterialCommunityIcons name="incognito" size={24} color="black" />
            <Text className="text-lg m-3 text-center">Continue as Guest</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-3">
          <Text className="text-md text-white text-center">
            By proceeding further, you agree to our{" "}
            <Link href="/home">Terms of Service</Link> and acknowledge our
            Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
