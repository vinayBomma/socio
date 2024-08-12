import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as Clipboard from "expo-clipboard";
import supabase from "@/lib/supabase";
import { router } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Create = () => {
  const [isHabit, setIsHabit] = useState(true);
  const [isGroup, setIsGroup] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [userUUID, setUserUUID] = useState<string | undefined>(undefined);
  const [habitForm, setHabitForm] = useState({
    name: "",
    description: "",
    frequency_count: "",
    frequency_period: "",
    isReminder: false,
    reminderTime: new Date(),
    reminderNote: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log(data?.session?.user?.id);
      setUserUUID(data?.session?.user?.id);
      if (!data?.session) {
        router.push("/");
      }
    };
    fetchUser();
  }, []);

  const unselectedClass =
    "px-5 py-2 flex-row items-center m-1 rounded-full border-2";
  const selectedClass =
    "px-5 py-2 bg-black flex-row items-center m-1 rounded-full";

  const onChange = (selectedDate: any) => {
    const currentDate = new Date(selectedDate?.nativeEvent?.timestamp);
    handleChange("reminderTime", currentDate);
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
        created_at: new Date(),
        uuid: userUUID,
        name: habitForm.name,
        description: habitForm.description,
        frequency_count: habitForm.frequency_count,
        frequency_period: habitForm.frequency_period,
      })
      .select();

    router.push("/home");
    console.log(data, error);
  };

  const handleCreateGroup = async () => {
    const { data, error } = await supabase
      .from("groups")
      .insert({
        created_at: new Date(),
        name: "Some Group",
        group_code: groupCode,
        description: "some description",
      })
      .select();

    console.log(data, error);
  };

  const handleChange = (name: string, value: any) => {
    setHabitForm({ ...habitForm, [name]: value });
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
      <ScrollView>
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
              className={isHabit ? selectedClass : unselectedClass}
            >
              <Feather
                name="command"
                size={24}
                color={isHabit ? "white" : "black"}
              />
              <Text
                className={
                  isHabit
                    ? "text-xl text-white ml-3"
                    : "text-xl ml-3 text-black"
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
                  isGroup
                    ? "text-xl text-white ml-3"
                    : "text-xl ml-3 text-black"
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
                  placeholder="Habit Name*"
                  value={habitForm.name}
                  onChangeText={(value) => handleChange("name", value)}
                />
                <TextInput
                  className="w-full text-lg border-2 border-black p-3 rounded-xl mt-5"
                  placeholder="Description"
                  value={habitForm.description}
                  onChangeText={(value) => handleChange("description", value)}
                />
                <View className="w-full flex-row justify-between">
                  <TextInput
                    className="w-6/12 text-base border-2 border-black p-3 rounded-xl mt-5"
                    placeholder="Frequency, eg. 5*"
                    value={habitForm.frequency_count}
                    onChangeText={(value) =>
                      handleChange("frequency_count", value)
                    }
                  />
                  <View className="w-5/12 text-base border-2 border-black px-1 rounded-xl mt-5">
                    <RNPickerSelect
                      onValueChange={(value) =>
                        handleChange("frequency_period", value)
                      }
                      items={[
                        { label: "Weekly", value: "weekly" },
                        { label: "Monthly", value: "daily" },
                      ]}
                    />
                  </View>
                </View>
                <View className="w-full flex-row p-5 items-center justify-around">
                  <View className="w-5/12">
                    <BouncyCheckbox
                      text="Reminder?"
                      fillColor="black"
                      textStyle={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                        textDecorationLine: "none",
                      }}
                      onPress={(isChecked) =>
                        handleChange("reminder", isChecked)
                      }
                    />
                  </View>
                  <View className="w-6/12">
                    <TouchableOpacity
                      onPress={showTimepicker}
                      className="border-2 border-black p-3 rounded-xl w-full"
                    >
                      <Text className="text-base">
                        {habitForm.reminderTime?.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TextInput
                  className="w-full text-lg border-2 border-black p-3 rounded-xl"
                  placeholder="Note for reminder"
                  value={habitForm.reminderNote}
                  onChangeText={(value) => handleChange("reminderNote", value)}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
