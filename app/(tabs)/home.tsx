import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white mb-28">
      <ScrollView>
        <View className="flex-1 bg-white">
          <View className="flex-row justify-between items-center mt-3 p-5">
            <View className="ml-2">
              <Text className="text-3xl font-bold">sleep 8 hrs</Text>
            </View>
            <View className="mr-2">
              <Ionicons name="checkmark-circle" size={32} color="black" />
            </View>
          </View>
          <View className="h-20 w-full">
            <CalendarProvider date={new Date().toISOString().split("T")[0]}>
              <WeekCalendar
                firstDay={1}
                allowShadow={false}
                hideDayNames={false}
                pastScrollRange={0}
                futureScrollRange={0}
                markingType="period"
                markedDates={{
                  "2024-07-16": {
                    // selected: true,
                    // marked: false,
                    startingDay: true,
                    color: "teal",
                    textColor: "white",
                  },
                  "2024-07-17": {
                    selected: true,
                    // marked: false,
                    color: "teal",
                  },
                  "2024-07-18": {
                    selected: true,
                    // marked: false,
                    color: "teal",
                  },
                  "2024-07-19": {
                    selected: true,
                    // marked: false,
                    endingDay: true,
                    color: "teal",
                  },
                }}
              />
            </CalendarProvider>
          </View>
          <View className="flex-row justify-between items-center mt-3 p-5">
            <View className="ml-2">
              <Text className="text-3xl font-bold">reading</Text>
            </View>
            <View className="mr-2">
              <Ionicons name="checkmark-circle" size={32} color="grey" />
            </View>
          </View>
          <View className="h-20 w-full">
            <CalendarProvider date={new Date().toISOString().split("T")[0]}>
              <WeekCalendar
                firstDay={1}
                allowShadow={false}
                hideDayNames={false}
                pastScrollRange={0}
                futureScrollRange={0}
                markingType="period"
                markedDates={{
                  "2024-07-16": {
                    color: "teal",
                    selected: true,
                    // marked: true,
                    startingDay: true,
                    endingDay: true,
                    // textColor: "white",
                  },
                  // "2024-07-18": {
                  //   color: "teal",
                  //   selected: true,
                  //   endingDay: true,
                  // },
                }}
              />
            </CalendarProvider>
          </View>
          <View className="flex-row justify-between items-center mt-3 p-5">
            <View className="ml-2">
              <Text className="text-3xl font-bold">meditate</Text>
            </View>
            <View className="mr-2">
              <Ionicons name="checkmark-circle" size={32} color="grey" />
            </View>
          </View>
          <View className="h-20 w-full">
            <CalendarProvider date={new Date().toISOString().split("T")[0]}>
              <WeekCalendar
                firstDay={1}
                allowShadow={false}
                hideDayNames={false}
                futureScrollRange={0}
                markingType="period"
                markedDates={{
                  "2024-07-18": {
                    // selected: true,
                    // marked: false,
                    startingDay: true,
                    color: "teal",
                    textColor: "white",
                  },
                  "2024-07-19": {
                    selected: true,
                    // marked: false,
                    color: "teal",
                  },
                  // "2024-07-18": {
                  //   selected: true,
                  //   // marked: false,
                  //   color: "black",
                  // },
                  // "2024-07-19": {
                  //   selected: true,
                  //   // marked: false,
                  //   endingDay: true,
                  //   color: "black",
                  // },
                }}
              />
            </CalendarProvider>
          </View>
          <View className="flex-row justify-between items-center mt-3 p-5">
            <View className="ml-2">
              <Text className="text-3xl font-bold">exercise</Text>
            </View>
            <View className="mr-2">
              <Ionicons name="checkmark-circle" size={32} color="black" />
            </View>
          </View>
          <View className="h-20 w-full">
            <CalendarProvider date={new Date().toISOString().split("T")[0]}>
              <WeekCalendar
                firstDay={1}
                allowShadow={false}
                hideDayNames={false}
                futureScrollRange={0}
                markingType="period"
                markedDates={{
                  "2024-07-15": {
                    // selected: true,
                    // marked: false,
                    startingDay: true,
                    color: "teal",
                    textColor: "white",
                  },
                  "2024-07-17": {
                    selected: true,
                    // marked: false,
                    color: "teal",
                  },
                  "2024-07-18": {
                    selected: true,
                    // marked: false,
                    color: "teal",
                  },
                  "2024-07-19": {
                    selected: true,
                    // marked: false,
                    endingDay: true,
                    color: "teal",
                  },
                }}
              />
            </CalendarProvider>
          </View>
          <View className="flex-row justify-between items-center mt-3 p-5">
            <View className="ml-2">
              <Text className="text-3xl font-bold">hit the gym</Text>
            </View>
            <View className="mr-2">
              <Ionicons name="checkmark-circle" size={32} color="black" />
            </View>
          </View>
          <View className="h-20 w-full">
            <CalendarProvider date="2024-07-19">
              <WeekCalendar
                firstDay={1}
                allowShadow={false}
                hideDayNames={false}
                futureScrollRange={0}
                markingType="period"
                markedDates={{
                  "2024-07-15": {
                    // selected: true,
                    // marked: false,
                    startingDay: true,
                    color: "teal",
                    textColor: "white",
                  },
                  "2024-07-17": {
                    selected: true,
                    // marked: false,
                    color: "teal",
                  },
                  "2024-07-18": {
                    selected: true,
                    // marked: false,
                    color: "teal",
                  },
                  "2024-07-19": {
                    selected: true,
                    // marked: false,
                    endingDay: true,
                    color: "teal",
                  },
                }}
              />
            </CalendarProvider>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
