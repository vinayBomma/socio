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
        "User has consistently being exercising since 5 days. Give a short funny and quirky response. Be positive"
      );
      setGeminiData(geminiData);
    };
    fetchUser();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white pb-28">
      <ScrollView>
        <View>
          <Text className="text-2xl font-pblack p-5 text-center">
            AI DIGEST
          </Text>
        </View>
        <View className="flex-1 items-center justify-center p-3">
          {geminiData ? (
            <Text className="text-lg font-psemibold p-5 text-center">
              {geminiData}
            </Text>
          ) : (
            <>
              <Feather name="info" size={32} color="black" />
              <Text className="text-lg font-psemibold p-5 text-center">
                No data is currently available. As you continue tracking your
                habits, your AI insights will soon be displayed here.
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Digest;

const styles = StyleSheet.create({});
