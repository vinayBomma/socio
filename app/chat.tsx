import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import supabase from "@/lib/supabase";

const Chat = () => {
  const [messages, setMessages]: any = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const data: any = useLocalSearchParams();
  const groupId = data?.id;
  const PLACEHOLDER_AVATAR = "https://cataas.com/cat";
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data?.session?.user?.id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!groupId) return;
    const fetchMessages = async () => {
      const { data: msgs } = await supabase
        .from("messages")
        .select("*")
        .eq("group_id", groupId)
        .order("created_at", { ascending: true });
      setMessages(
        (msgs || []).map((msg: any) => ({
          _id: msg.id,
          text: msg.text,
          createdAt: msg.created_at,
          user: {
            _id: msg.user_id,
            name: msg.user_id === userId ? "You" : "User",
          },
        }))
      );
    };
    fetchMessages();
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `group_id=eq.${groupId}`,
        },
        (payload) => {
          const msg = payload.new;
          setMessages((prev: any) => {
            if (prev.some((m: any) => m._id === msg.id)) return prev;
            return [
              ...prev,
              {
                _id: msg.id,
                text: msg.text,
                createdAt: msg.created_at,
                user: {
                  _id: msg.user_id,
                  name: msg.user_id === userId ? "You" : "User",
                },
              },
            ];
          });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId, userId]);

  const handleInputText = (text: string) => {
    setInputMessage(text);
  };

  const handleSubmit = async () => {
    if (!inputMessage.trim() || !userId || !groupId) return;
    await supabase.from("messages").insert({
      group_id: groupId,
      user_id: userId,
      text: inputMessage,
      created_at: new Date().toISOString(),
    });
    setInputMessage("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between p-3 border-b border-b-gray-200">
        <View className="flex-row items-center">
          <View className="w-1/12">
            <TouchableOpacity onPress={() => router.replace("/groups")}>
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center w-10/12">
            <Image
              className="h-12 w-12 rounded-full ml-3"
              source={{ uri: data?.avatar || PLACEHOLDER_AVATAR }}
              resizeMode="cover"
            />
            <Text className="ml-5 font-semibold text-lg">{data?.name}</Text>
          </View>
          <View className="w-1/12">
            <TouchableOpacity onPress={() => router.push("/group_info" as any)}>
              <Feather name="info" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, width: "100%" }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current &&
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <View className="items-center mt-2 mb-1">
            <Text className="text-xs text-gray-400 font-psemibold">
              This is the beginning of your conversation.
            </Text>
          </View>
          {[...messages]
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            .map((msg: any) => (
              <View
                key={msg._id}
                style={{
                  alignSelf:
                    msg.user._id === userId ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.user._id === userId ? "#222222" : "#111111",
                  borderRadius: 18,
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  marginVertical: 2,
                  marginHorizontal: 8,
                  maxWidth: "80%",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                  }}
                >
                  {msg.text}
                </Text>
                <Text
                  style={{
                    color: "#cccccc",
                    fontFamily: "Poppins-Light",
                    fontSize: 12,
                    alignSelf: "flex-end",
                    marginTop: 2,
                  }}
                >
                  {msg.createdAt
                    ? (() => {
                        const utcDate = new Date(msg.createdAt);
                        const localDate = new Date(
                          utcDate.getTime() +
                            utcDate.getTimezoneOffset() * -60000
                        );
                        return localDate.toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        });
                      })()
                    : ""}
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>

      <View className="flex-row items-center justify-between h-16 mb-3">
        <View className="flex-row w-4/5 justify-start p-3 ml-3 border-2 border-gray-200 rounded-xl">
          <TextInput
            className="w-full text-lg"
            placeholder="Type a message"
            placeholderTextColor={"black"}
            value={inputMessage}
            onChangeText={handleInputText}
          />
        </View>
        <TouchableOpacity
          className="rounded-full bg-black p-3 mr-3"
          onPress={handleSubmit}
          disabled={!inputMessage.trim()}
          style={{ opacity: inputMessage.trim() ? 1 : 0.5 }}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
