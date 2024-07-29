import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import supabase from "@/lib/supabase";

const Home = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/");
      }
    };
    fetchUser();
  });
  const habitsList = ["sleep 8 hrs", "reading", "meditate daily"];

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
          {habitsList.map((item) => (
            <View key={item}>
              <TouchableOpacity
                onPress={() => router.push("/stats")}
                className="flex-row justify-between items-center px-5"
              >
                <View className="ml-2 w-3/5">
                  <Text className="text-2xl font-psemibold">{item}</Text>
                </View>
                <View className="mr-2 flex-row items-center">
                  <FontAwesome5 name="gripfire" size={32} color="orange" />
                  <Text className="text-2xl font-semibold ml-2">3</Text>
                </View>
                <View className="mr-2">
                  <Ionicons name="checkmark-circle" size={32} color="black" />
                </View>
              </TouchableOpacity>
              <View className="h-20 w-full">
                <CalendarProvider date={new Date().toISOString().split("T")[0]}>
                  <WeekCalendar
                    firstDay={1}
                    allowShadow={false}
                    hideDayNames={true}
                    pastScrollRange={0}
                    futureScrollRange={0}
                    markingType="period"
                    markedDates={{
                      "2024-07-16": {
                        // selected: true,
                        // marked: false,
                        startingDay: true,
                        color: "black",
                        textColor: "white",
                      },
                      "2024-07-17": {
                        selected: true,
                        // marked: false,
                        color: "black",
                      },
                      "2024-07-18": {
                        selected: true,
                        // marked: false,
                        color: "black",
                      },
                      "2024-07-19": {
                        selected: true,
                        // marked: false,
                        endingDay: true,
                        color: "black",
                      },
                    }}
                  />
                </CalendarProvider>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
