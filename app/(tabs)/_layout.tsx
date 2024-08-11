import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            display: route.name === "create" ? "none" : "flex",
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "black",
            borderRadius: 15,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          },
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="today-sharp"
                  size={28}
                  color={focused ? "white" : "grey"}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="digest"
          options={{
            title: "Digest",
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="sparkles-sharp"
                  size={28}
                  color={focused ? "white" : "grey"}
                />
              );
            },
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: () => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    height: 60,
                    backgroundColor: "teal",
                    borderRadius: 30,
                    marginBottom: 60,
                  }}
                >
                  <Ionicons name="add-sharp" size={28} color="white" />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            title: "Groups",
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="people-sharp"
                  size={28}
                  color={focused ? "white" : "grey"}
                />
              );
            },
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="settings-sharp"
                  size={28}
                  color={focused ? "white" : "grey"}
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
