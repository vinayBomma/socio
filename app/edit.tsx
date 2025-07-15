import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import supabase from "@/lib/supabase";

const Edit = () => {
  const { id } = useLocalSearchParams();
  const [stats, setStats] = useState<{
    total: number;
    completed: number;
    percent: number;
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!id) return;
      // Get completions for this habit
      const { data: completions, error: cErr } = await supabase
        .from("habit_completions")
        .select("id")
        .eq("habit_id", id);
      // Get the habit
      const { data: habitArr, error: hErr } = await supabase
        .from("habits")
        .select("id")
        .eq("id", id)
        .single();
      if (cErr || hErr || !habitArr?.id) {
        setStats(null);
        return;
      }
      const total = 1;
      const completed = completions ? completions.length : 0;
      const percent = 100; // For a single habit, completion rate is not meaningful, so show 100% if any completions
      setStats({ total, completed, percent });
    };
    fetchStats();
  }, [id]);
  const confirmDelete = () => {
    Alert.alert("Delete Habit", "Are you sure you want to delete this habit?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          if (!id) return;
          const { error } = await supabase.from("habits").delete().eq("id", id);
          if (error) {
            Alert.alert("Error", "Failed to delete habit. Please try again.");
          } else {
            router.replace("/(tabs)/home");
          }
        },
      },
    ]);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-row items-center justify-between p-5 px-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={confirmDelete}>
            <Feather name="trash" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Stats Card (like stats screen) */}
        <View className="px-5 mt-6">
          {stats ? (
            <View className="w-full bg-gray-100 rounded-xl p-6 items-center mb-6">
              <Text className="text-xl font-pbold mb-2">Habits Overview</Text>
              <Text className="text-lg mb-1">
                Total Habits: <Text className="font-pbold">{stats.total}</Text>
              </Text>
              <Text className="text-lg mb-1">
                Completions:{" "}
                <Text className="font-pbold">{stats.completed}</Text>
              </Text>
              <Text className="text-lg mb-1">
                Completion Rate:{" "}
                <Text className="font-pbold">{stats.percent}%</Text>
              </Text>
            </View>
          ) : (
            <View className="w-full bg-gray-100 rounded-xl p-6 items-center mb-6">
              <Text className="text-lg text-gray-400">Loading...</Text>
            </View>
          )}
          {/* Coming Soon Cards */}
          <View className="space-y-3">
            <View className="bg-white rounded-xl p-4 border border-gray-100 opacity-70">
              <Text className="text-base font-psemibold text-gray-800">
                Chart (coming soon)
              </Text>
            </View>
            <View className="bg-white rounded-xl p-4 border border-gray-100 opacity-70">
              <Text className="text-base font-psemibold text-gray-800">
                AI Insights (coming soon)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Edit;
