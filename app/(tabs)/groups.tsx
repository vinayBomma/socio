import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import supabase from "@/lib/supabase";

const Groups = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/");
      }
    };
    fetchUser();
  });
  const [messages, setMessages]: any = useState([
    {
      id: 1,
      name: "React Native",
      avatar: "https://loremflickr.com/500/500",
    },
    {
      id: 2,
      name: "Jest",
      avatar: "https://loremflickr.com/500/500",
    },
    {
      id: 3,
      name: "Expo",
      avatar: "https://loremflickr.com/500/500",
    },
    {
      id: 4,
      name: "Jest",
      avatar: "https://loremflickr.com/500/500",
    },
  ]);

  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        className="w-full flex-row items-center border-b border-b-gray-200"
        key={index}
        onPress={() => router.push({ pathname: "/chat", params: item })}
      >
        <View>
          <Image
            className="w-16 h-16 rounded-full my-3"
            source={{ uri: item?.avatar }}
            resizeMode="contain"
          />
        </View>
        <View className="flex-row w-full">
          <View className="flex-col">
            <Text className="font-semibold text-sm ml-3 mb-2">
              {item?.name}
            </Text>
            <Text className="ml-3">{"Hey you there?"}</Text>
          </View>
          <View className="absolute right-16">
            <Text>{"2: 24pm"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <View>
        <Text className="text-2xl font-pblack p-5 text-center">GROUPS</Text>
      </View>
      <View className="flex-1 px-5 bg-white">
        <FlatList
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Groups;
