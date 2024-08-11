import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

const Edit = () => {
  const confirmDelete = () => {
    Alert.alert("Delete Habit", "Are you sure you want to delete this habit?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => console.log("OK Pressed") },
    ]);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-row items-center justify-between p-5 px-5">
          <Text className="text-2xl font-pblack text-center uppercase absolute left-0 right-0">
            Edit
          </Text>

          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={confirmDelete}>
            <Feather name="trash" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Edit;
