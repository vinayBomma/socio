import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useFocusEffect } from "expo-router";
import supabase from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { useAppSelector } from "@/store/hooks";
import { useSupabaseUser } from "@/lib/user";
import JoinGroupDialog from "@/components/JoinGroupDialog";

const PLACEHOLDER_AVATAR = "https://cataas.com/cat";

const Groups = () => {
  useSupabaseUser();
  const user = useAppSelector((state) => state.auth.user);
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastMessages, setLastMessages] = useState<{
    [groupId: string]: { text: string; created_at: string };
  }>({});
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joining, setJoining] = useState(false);

  const fetchGroups = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data: memberships, error: memberError } = await supabase
        .from("group_members")
        .select("group_id")
        .eq("user_id", user.id);
      if (memberError) {
        console.error("Error fetching memberships:", memberError.message);
        setGroups([]);
        setLastMessages({});
        setLoading(false);
        return;
      }
      const groupIds = memberships?.map((m: any) => m.group_id) || [];
      if (groupIds.length === 0) {
        setGroups([]);
        setLastMessages({});
        setLoading(false);
        return;
      }
      const { data: groups, error } = await supabase
        .from("groups")
        .select("*")
        .in("id", groupIds);
      if (error) {
        console.error("Error fetching groups:", error.message);
        setGroups([]);
        setLastMessages({});
        setLoading(false);
        return;
      }
      setGroups(groups || []);
      const { data: messages, error: msgError } = await supabase
        .from("messages")
        .select("group_id,text,created_at")
        .in("group_id", groupIds)
        .order("created_at", { ascending: false });
      if (msgError) {
        console.error("Error fetching last messages:", msgError.message);
        setLastMessages({});
        setLoading(false);
        return;
      }
      // Find the latest message for each group
      const lastMsgMap: {
        [groupId: string]: { text: string; created_at: string };
      } = {};
      (messages || []).forEach((msg: any) => {
        if (!lastMsgMap[msg.group_id]) {
          lastMsgMap[msg.group_id] = {
            text: msg.text,
            created_at: msg.created_at,
          };
        }
      });
      setLastMessages(lastMsgMap);
      setLoading(false);
    } catch (err) {
      console.error("Error in fetchGroups:", err);
      setGroups([]);
      setLastMessages({});
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        fetchGroups();
      }
    }, [user?.id])
  );

  const handleJoinGroup = async (code?: string) => {
    const groupCode = typeof code === "string" ? code : joinCode;
    if (!groupCode.trim()) {
      Alert.alert("Error", "Please enter a group code.");
      return;
    }
    if (!user?.id) {
      Alert.alert("Error", "User not found. Please log in again.");
      return;
    }
    setJoining(true);
    // Find group by code
    const { data: group, error } = await supabase
      .from("groups")
      .select("id")
      .eq("group_code", groupCode.trim())
      .single();
    if (error || !group) {
      Alert.alert("Error", "Group not found.");
      setJoining(false);
      return;
    }
    // Add user to group_members
    const { error: memberError } = await supabase
      .from("group_members")
      .insert({ group_id: group.id, user_id: user.id });
    if (memberError) {
      Alert.alert("Error", "Could not join group.");
      setJoining(false);
      return;
    }
    setShowJoinDialog(false);
    setJoinCode("");
    setJoining(false);
    // Refresh groups list
    fetchGroups();
  };

  const renderItem = ({ item, index }: any) => {
    const avatarUri =
      item?.avatar && item.avatar.trim() !== ""
        ? item.avatar
        : PLACEHOLDER_AVATAR;
    const lastMsg = lastMessages[item.id]?.text || "No messages yet";
    const lastMsgDate = lastMessages[item.id]?.created_at
      ? new Date(lastMessages[item.id].created_at + "Z").toLocaleString([], {
          timeStyle: "short",
        })
      : "";
    return (
      <TouchableOpacity
        className="w-full flex-row items-center py-4 px-3 border-b border-b-gray-100"
        key={index}
        onPress={() => router.replace({ pathname: "/chat", params: item })}
      >
        <View className="mr-3">
          <Image
            className="w-14 h-14 rounded-full"
            source={{ uri: avatarUri }}
            resizeMode="cover"
          />
        </View>
        <View className="flex-1 flex-row justify-between items-center">
          <View className="flex-1 mr-2">
            <Text className="font-psemibold text-base text-gray-900 mb-1">
              {item?.name}
            </Text>
            <Text
              className="text-sm text-gray-500 font-pregular"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {lastMsg}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-gray-400 font-pregular">
              {lastMsgDate}
            </Text>
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
          onPress={() => setShowJoinDialog(true)}
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
            You haven't joined or created any groups yet. Connect with others
            and stay motivated by joining or starting a group.
          </Text>
        </View>
      ) : (
        <View className="flex-1 bg-white">
          <FlatList
            data={groups}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      )}
      <JoinGroupDialog
        visible={showJoinDialog}
        onClose={() => setShowJoinDialog(false)}
        onJoin={handleJoinGroup}
        loading={joining}
        value={joinCode}
        onChange={setJoinCode}
      />
    </SafeAreaView>
  );
};

export default Groups;
