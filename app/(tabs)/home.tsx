import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import supabase from "@/lib/supabase";
import { useAppSelector } from "@/store/hooks";
import { useSupabaseUser } from "@/lib/user";

const Home = () => {
  useSupabaseUser();
  const user = useAppSelector((state) => state.auth.user);

  type Habit = {
    id: string;
    name: string;
    description?: string;
    [key: string]: any;
  };
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<{
    [habitId: string]: { [date: string]: boolean };
  }>({}); // { habitId: { 'YYYY-MM-DD': true } }

  useEffect(() => {
    if (!user?.id) return;
    const fetchHabits = async () => {
      const { data } = await supabase
        .from("habits")
        .select("*")
        .eq("uuid", user.id);
      setHabits(data || []);
    };
    fetchHabits();
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id || habits.length === 0) return;
    const fetchCompletions = async () => {
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay() + 1); // Monday
      const end = new Date(start);
      end.setDate(start.getDate() + 6); // Sunday
      const startStr = start.toISOString().split("T")[0];
      const endStr = end.toISOString().split("T")[0];
      const { data } = await supabase
        .from("habit_completions")
        .select("habit_id,date")
        .eq("user_id", user.id)
        .gte("date", startStr)
        .lte("date", endStr);
      const map: { [habitId: string]: { [date: string]: boolean } } = {};
      (data || []).forEach((c) => {
        if (!map[c.habit_id]) map[c.habit_id] = {};
        map[c.habit_id][c.date] = true;
      });
      setCompletions(map);
    };
    fetchCompletions();
  }, [user?.id, habits]);

  const toggleCompletion = async (habitId: string, dateStr: string) => {
    if (!user?.id) {
      console.error("No userId found");
      return;
    }
    try {
      if (completions[habitId]?.[dateStr]) {
        const { error } = await supabase
          .from("habit_completions")
          .delete()
          .eq("habit_id", habitId)
          .eq("user_id", user.id)
          .eq("date", dateStr);
        if (error) {
          console.error("Delete error:", error.message);
        } else {
          console.log(`Deleted completion for habit ${habitId} on ${dateStr}`);
        }
      } else {
        const { error } = await supabase.from("habit_completions").insert({
          habit_id: habitId,
          user_id: user.id,
          date: dateStr,
        });
        if (error) {
          console.error("Insert error:", error.message);
        } else {
          console.log(`Inserted completion for habit ${habitId} on ${dateStr}`);
        }
      }
    } catch (err) {
      console.error("toggleCompletion exception:", err);
    }

    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay() + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const startStr = start.toISOString().split("T")[0];
    const endStr = end.toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("habit_completions")
      .select("habit_id,date")
      .eq("user_id", user.id)
      .gte("date", startStr)
      .lte("date", endStr);
    if (error) {
      console.error("Fetch completions error:", error.message);
    }
    const map: { [habitId: string]: { [date: string]: boolean } } = {};
    (data || []).forEach((c) => {
      if (!map[c.habit_id]) map[c.habit_id] = {};
      map[c.habit_id][c.date] = true;
    });
    setCompletions(map);
  };

  const getWeekDates = () => {
    const week = [];
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay() + 1); // Monday
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      week.push(d.toISOString().split("T")[0]);
    }
    return week;
  };

  return (
    <SafeAreaView className="flex-1 bg-white mb-28">
      <ScrollView>
        <View className="flex-1 bg-white">
          <View>
            <Text className="text-2xl font-pblack p-5 text-center">TODAY</Text>
          </View>
          <View className="mb-8">
            <CalendarProvider date={new Date().toISOString().split("T")[0]}>
              <WeekCalendar firstDay={1} />
            </CalendarProvider>
          </View>
          {habits.length === 0 ? (
            <View className="flex-1 items-center justify-center mx-3 py-5 bg-black rounded-xl">
              <Feather name="info" size={32} color="white" />
              <Text className="text-lg font-psemibold text-white text-center px-5 mt-3">
                You haven't added any habits yet. Start building positive
                routines by creating your first habit.
              </Text>
            </View>
          ) : (
            habits.map((habit) => {
              const weekDates = getWeekDates();
              const markedDates: {
                [date: string]: {
                  selected: boolean;
                  color: string;
                  textColor: string;
                };
              } = {};
              weekDates.forEach((date) => {
                if (completions[habit.id]?.[date]) {
                  markedDates[date] = {
                    selected: true,
                    color: "black",
                    textColor: "white",
                  };
                }
              });
              const todayStr = new Date().toISOString().split("T")[0];
              return (
                <View key={habit.id} className="rounded-xl m-1 px-3">
                  <View className="flex-row justify-between items-center">
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/edit",
                          params: { id: habit.id },
                        })
                      }
                    >
                      <Text className="text-2xl font-psemibold ml-2">
                        {habit.name}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => toggleCompletion(habit.id, todayStr)}
                      className="mr-2"
                    >
                      <Ionicons
                        name={
                          completions[habit.id]?.[todayStr]
                            ? "checkmark-circle"
                            : "ellipse-outline"
                        }
                        size={32}
                        color={
                          completions[habit.id]?.[todayStr] ? "black" : "gray"
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="h-20 w-full mt-1">
                    <CalendarProvider date={todayStr}>
                      <WeekCalendar
                        firstDay={1}
                        allowShadow={false}
                        hideDayNames={true}
                        pastScrollRange={0}
                        futureScrollRange={0}
                        markingType="period"
                        markedDates={markedDates}
                      />
                    </CalendarProvider>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
