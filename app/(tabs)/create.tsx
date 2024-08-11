import { TextInput, TouchableOpacity, View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as Clipboard from "expo-clipboard";
import supabase from "@/lib/supabase";
import { router } from "expo-router";

const Create = () => {
  const [isHabit, setIsHabit] = useState(true);
  const [isGroup, setIsGroup] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const unselectedClass =
    "px-5 py-2 flex-row items-center m-1 rounded-full border-2";
  const selectedClass =
    "px-5 py-2 bg-black flex-row items-center m-1 rounded-full";

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleCreateHabit = async () => {
    const { data, error } = await supabase
      .from("habits")
      .insert({
        id: Math.floor(Date.now() + Math.random()),
        created_at: new Date(),
        name: "Some name",
      })
      .select();

    console.log(data, error);
  };

  const handleCreateGroup = async () => {
    const { data, error } = await supabase
      .from("groups")
      .insert({
        id: 3,
        created_at: new Date(),
        name: "Some Group",
        group_code: groupCode,
        description: "some description",
      })
      .select();

    console.log(data, error);
  };

  const generateGroupCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setGroupCode(result);
    copyToClipboard(result);
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-5 px-5">
        <Text className="text-2xl font-pblack text-center uppercase absolute left-0 right-0">
          Create
        </Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 bg-white justify-start mt-5">
        <View className="flex-row justify-center">
          <TouchableOpacity
            onPress={() => {
              setIsHabit(!isHabit);
              setIsGroup(false);
            }}
            // className="border-r"
            className={isHabit ? selectedClass : unselectedClass}
          >
            <Feather
              name="command"
              size={24}
              color={isHabit ? "white" : "black"}
            />
            <Text
              className={
                isHabit ? "text-xl text-white ml-3" : "text-xl ml-3 text-black"
              }
            >
              Habit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsGroup(!isGroup);
              setIsHabit(false);
            }}
            className={isGroup ? selectedClass : unselectedClass}
          >
            <Feather
              name="users"
              size={24}
              color={isGroup ? "white" : "black"}
            />
            <Text
              className={
                isGroup ? "text-xl text-white ml-3" : "text-xl ml-3 text-black"
              }
            >
              Group
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-wrap mt-5 p-5">
          {isHabit ? (
            <>
              <TextInput
                className="w-full text-lg border-2 border-black p-3 rounded-xl"
                placeholder="Habit Name"
              />
              <TextInput
                className="w-full text-lg border-2 border-black p-3 rounded-xl mt-5"
                placeholder="Description"
              />
              <TextInput
                className="w-full text-lg border-2 border-black p-3 rounded-xl mt-5"
                placeholder="Frequency"
              />
              <TextInput
                onPress={showTimepicker}
                className="w-full text-lg border-2 border-black p-3 rounded-xl mt-5"
                placeholder="Reminder"
              />
              <TextInput
                className="w-full text-lg border-2 border-black p-3 rounded-xl mt-5"
                placeholder="Note for reminder"
              />
              <TouchableOpacity
                className="mt-5 bg-black p-3 rounded-xl w-full"
                onPress={handleCreateHabit}
              >
                <Text className="text-lg text-white text-center">
                  Create Habit
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                className="w-full text-lg border-2 border-black p-3 rounded-xl"
                placeholder="Group Name"
              />
              <TextInput
                className="w-full text-lg border-2 border-black p-3 rounded-xl mt-5"
                placeholder="Description"
              />
              <View className="w-full flex-row flex-wrap">
                <TextInput
                  readOnly
                  className="w-3/5 text-lg border-2 border-black p-3 rounded-xl mt-5 text-black"
                  placeholder="Group Code"
                  value={groupCode}
                />
                <TouchableOpacity
                  className="mt-5 bg-black rounded-xl w-2/6 justify-center ml-3"
                  onPress={generateGroupCode}
                >
                  <Text className="text-base text-white text-center">
                    Generate
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="mt-5 bg-black p-3 rounded-xl w-full"
                onPress={handleCreateGroup}
              >
                <Text className="text-lg text-white text-center">
                  Create Group
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Create;
