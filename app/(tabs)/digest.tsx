import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import supabase from "@/lib/supabase";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import getGeminiResponse from "@/lib/gemini";

const Digest = () => {
  const [geminiData, setGeminiData] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/");
      }

      const geminiData: any = await getGeminiResponse(
        "User has checked don't drink alcohol for 3 days."
      );
      setGeminiData(geminiData);
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white pb-28">
      <ScrollView>
        <View>
          <Text className="text-2xl font-pblack p-5 text-center uppercase">
            AI Digest
          </Text>
        </View>
        <View className="flex-1 items-center justify-center p-3">
          {geminiData ? (
            <>
              <View className="border-b border-gray-300">
                <Text className="text-xl font-pbold p-3 text-center">
                  Exercise
                </Text>
                <Text className="text-lg font-psemibold text-center px-3">
                  {geminiData}
                </Text>
              </View>
              <View className="border-b border-gray-300">
                <Text className="text-xl font-pbold p-3 text-center">
                  Reading
                </Text>
                <Text className="text-lg font-psemibold text-center px-3">
                  {geminiData}
                </Text>
              </View>
              <View className="border-b border-gray-300">
                <Text className="text-xl font-pbold p-3 text-center">
                  Knitting
                </Text>
                <Text className="text-lg font-psemibold text-center px-3">
                  {geminiData}
                </Text>
              </View>
              <View className="border-b border-gray-300">
                <Text className="text-xl font-pbold p-3 text-center">
                  Sleep
                </Text>
                <Text className="text-lg font-psemibold text-center px-3">
                  {geminiData}
                </Text>
              </View>
            </>
          ) : (
            <View className="flex-1 items-center justify-center mx-3 py-5 bg-black rounded-xl">
              <Feather name="info" size={32} color="white" />
              <Text className="text-lg font-psemibold text-white text-center px-5 mt-3">
                AI insights will soon appear here as you continue tracking your habits
                and progress.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Digest;

const styles = StyleSheet.create({});
