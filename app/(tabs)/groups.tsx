import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useFocusEffect } from "expo-router";
import supabase from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";

const Groups = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (!data?.session) {
      router.push("/");
      return;
    }
    const { data: groupsData, error: groupsError } = await supabase
      .from("groups")
      .select("*");
    if (groupsError) {
      console.error("Error fetching groups:", groupsError.message);
      setGroups([]);
    } else {
      setGroups(groupsData || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchGroups();
    }, [])
  );

  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        className="w-full flex-row items-center border-b border-b-gray-200"
        key={index}
        onPress={() => router.replace({ pathname: "/chat", params: item })}
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
          onPress={() => router.push("/join_group" as any)}
        >
          <Feather name="user-plus" size={24} color="black" />
          <Text className="text-base p-2 uppercase font-psemibold">Join</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View className="items-center justify-center flex-1">
          <Text>Loading...</Text>
        </View>
      ) : groups?.length > 0 ? (
        <View className="flex-1 px-5 bg-white">
          <FlatList
            data={groups}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
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
