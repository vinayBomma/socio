import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = () => {
  const [messages, setMessages]: any = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const renderMessage = (props: any) => {
    const { currentMessage } = props;
    if (currentMessage?.user?._id === 2) {
      return (
        <View className="flex-row flex-1 justify-end">
          <Bubble
            {...props}
            wrapperStyle={{
              right: { backgroundColor: "#93c5fd", marginRight: 10 },
            }}
            textStyle={{ right: { color: "#000" } }}
          />
        </View>
      );
    }
  };

  const handleInputText = (text: string) => {
    setInputMessage(text);
  };

  const handleSubmit = () => {
    const newMessage = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://placeimg.com/200/200/any",
      },
    };

    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
    setInputMessage("");

    console.log("newMessage", messages);
  };

  const data: any = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between p-3 border-b border-b-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-row items-center w-full">
            <Image
              className="h-12 w-12 rounded-full ml-3"
              source={{ uri: data?.avatar }}
              resizeMode="contain"
            />
            <Text className="ml-5 font-semibold text-lg">{data?.name}</Text>
          </View>
        </View>
      </View>

      <GiftedChat
        messages={messages || []}
        user={{
          _id: 1,
        }}
        renderInputToolbar={() => null}
        minInputToolbarHeight={0}
        renderMessage={renderMessage}
      />

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
          className="rounded-full bg-teal-700 p-2 mr-3"
          onPress={handleSubmit}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
