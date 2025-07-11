import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useFocusEffect } from "expo-router";
import supabase from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";

const PLACEHOLDER_AVATAR = "https://cataas.com/cat";

const Groups = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (!data?.session) {
      router.push("/");
      return;
    }
    const userId = data.session.user.id;
    const { data: memberships, error: memberError } = await supabase
      .from("group_members")
      .select("group_id")
      .eq("user_id", userId);

    if (memberError) {
      console.error("Error fetching memberships:", memberError.message);
      setGroups([]);
      setLoading(false);
      return;
    }

    const groupIds = memberships?.map((m) => m.group_id) || [];
    if (groupIds.length === 0) {
      setGroups([]);
      setLoading(false);
      return;
    }

    const { data: groupsData, error: groupsError } = await supabase
      .from("groups")
      .select("*")
      .in("id", groupIds);

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
    const avatarUri = item?.avatar && item.avatar.trim() !== "" ? item.avatar : PLACEHOLDER_AVATAR;
    return (
      <TouchableOpacity
        className="w-full flex-row items-center border-b border-b-gray-200"
        key={index}
        onPress={() => router.replace({ pathname: "/chat", params: item })}
      >
        <View>
          <Image
            className="w-16 h-16 rounded-full my-3"
            source={{ uri: avatarUri }}
            resizeMode="cover"
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
      ) : groups?.length === 0 ? (
        <View className="items-center justify-center mx-3 py-5 bg-black rounded-xl">
          <Feather name="info" size={32} color="white" />
          <Text className="text-lg font-psemibold text-white text-center px-5 mt-3">
            You haven't joined or created any groups yet. Connect with others and stay motivated by joining or starting a group.
          </Text>
        </View>
      ) : (
        <View className="flex-1 px-5 bg-white">
          <FlatList
            data={groups}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Groups;
