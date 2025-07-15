import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Modal, Pressable } from "react-native";
const UPCOMING_FEATURES = [
  "Better statistics visualization",
  "More group features",
  "Push notifications",
  "Chat enhancements",
  "AI Insights with Gemini",
  "Dark mode",
  "Routines",
];
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import supabase from "@/lib/supabase";
import { router } from "expo-router";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { useAppSelector } from "@/store/hooks";
import { useSupabaseUser } from "@/lib/user";

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
  useSupabaseUser();
  const user = useAppSelector((state) => state.auth.user);
  const [dialogVisible, setDialogVisible] = useState<
    null | "about" | "features"
  >(null);

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <Text className="text-2xl font-pblack p-5 text-center">SETTINGS</Text>
      </View>
      <View className="items-center border-b border-b-gray-200 p-2">
        <Image
          className="w-16 h-16 rounded-full my-3"
          source={{
            uri:
              user?.user_metadata?.avatar_url ||
              "https://loremflickr.com/500/500",
          }}
        />
        <Text className="font-bold text-lg">
          {user?.user_metadata?.name || "Guest"}
        </Text>
      </View>
      {/* Upcoming Features Button (moved with About/Logout) */}
      <View className="p-3">
        <TouchableOpacity
          className="flex-row items-center p-2"
          onPress={() => setDialogVisible("about")}
        >
          <Feather name="info" size={24} color="black" />
          <View className="ml-2">
            <Text className="text-lg">About</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center p-2"
          onPress={() => setDialogVisible("features")}
        >
          <Feather name="star" size={22} />
          <View className="ml-2">
            <Text className="text-lg">Upcoming Features</Text>
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
      {/* Features Dialog */}
      <Modal
        visible={dialogVisible !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setDialogVisible(null)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}
          onPress={() => setDialogVisible(null)}
        >
          <View className="absolute left-0 right-0 top-1/4 mx-6 bg-white rounded-xl p-6 shadow-lg">
            {dialogVisible === "about" ? (
              <>
                <Text className="text-xl font-pbold mb-3 text-center">
                  About
                </Text>
                <Text className="text-base text-gray-700 mb-2 text-center font-pregular">
                  Socio is inspired by the Latin word “socius”, meaning
                  companion or ally. Socio helps you build habits, join groups,
                  and track your progress with friends. Stay motivated and
                  achieve your goals together!
                </Text>
                <Text className="text-base text-gray-500 text-center mb-2 font-pregular">
                  Version 1.0.0
                </Text>
              </>
            ) : dialogVisible === "features" ? (
              <>
                <Text className="text-xl font-pbold mb-3 text-center">
                  Upcoming Features
                </Text>
                <View className="w-full mt-2 mb-2">
                  {UPCOMING_FEATURES.map((feature, idx) => (
                    <View
                      key={idx}
                      className="flex-row items-start mb-1 w-full"
                    >
                      <Text className="text-base text-gray-700 mr-2 font-pregular">
                        •
                      </Text>
                      <Text className="text-base text-gray-700 flex-1 font-pregular">
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            ) : null}
            <TouchableOpacity
              className="mt-4 px-4 py-2 rounded-lg bg-black self-center"
              onPress={() => setDialogVisible(null)}
            >
              <Text className="text-white font-psemibold">Close</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default Settings;
