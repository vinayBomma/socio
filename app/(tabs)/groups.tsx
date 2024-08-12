import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import supabase from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";

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
      <View className="flex-row justify-between">
        <View className="w-3/12"></View>
        <View className="w-6/12 items-center">
          <Text className="text-2xl font-pblack p-5 text-center">GROUPS</Text>
        </View>
        <TouchableOpacity
          className="w-3/12 flex-row items-center ml-3"
          onPress={() => router.push("/join_group")}
        >
          <Feather name="user-plus" size={24} color="black" />
          <Text className="text-base p-2 uppercase font-psemibold">Join</Text>
        </TouchableOpacity>
      </View>
      {messages?.length > 0 ? (
        <View className="flex-1 px-5 bg-white">
          <FlatList
            data={messages}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View className="items-center justify-center">
          <Feather name="info" size={32} color="black" />
          <Text className="text-lg font-psemibold p-5 text-center">
            No groups found. Start tracking your habits with others by creating
            or joining a group today!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Groups;
