import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import supabase from "@/lib/supabase";
import { router } from "expo-router";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";

const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  console.log("data", data);
  return data.session;
};

const Settings = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/");
      }
    };
    fetchUser();
  });
  const url = Linking.useURL();
  console.log("url", url);
  if (url) createSessionFromUrl(url);
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) router.push("/");
  };

  const linkGoogleAccount = async () => {
    const { data, error } = await supabase.auth.linkIdentity({
      provider: "google",
      options: { redirectTo: redirectTo },
    });
    if (data?.url) {
      router.navigate(data?.url);
    }
    console.log("data", data);
    console.log("error", error);
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <Text className="text-2xl font-pblack p-5 text-center">SETTINGS</Text>
      </View>
      <View className="items-center border-b border-b-gray-200 p-2">
        <Image
          className="w-16 h-16 rounded-full my-3"
          source={{ uri: "https://loremflickr.com/500/500" }}
        />
        <Text className="font-bold text-lg">Guest</Text>
        <TouchableOpacity
          className="flex-row px-3 bg-black rounded items-center m-2"
          onPress={linkGoogleAccount}
        >
          <Image
            className="w-6 h-6"
            source={require("../../assets/google.png")}
          />
          <Text className="text-lg text-white p-3">Link Google Account</Text>
        </TouchableOpacity>
      </View>
      <View className="p-3">
        <TouchableOpacity className="flex-row items-center p-2">
          <Feather name="info" size={24} color="black" />
          <View className="ml-2">
            <Text className="text-lg">About</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center p-2"
          onPress={handleLogout}
        >
          <Feather name="log-out" size={24} color="black" />
          <View className="ml-2">
            <Text className="text-lg">Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
