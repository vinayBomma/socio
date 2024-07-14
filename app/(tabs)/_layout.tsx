import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#ffffff",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => {
              return <Feather name="home" size={24} color="black" />;
            },
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, focused }) => {
              return <Feather name="message-circle" size={24} color="black" />;
            },
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Statistics",
            tabBarIcon: ({ color, focused }) => {
              return <Feather name="bar-chart-2" size={24} color="black" />;
            },
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => {
              return <Feather name="user" size={24} color="black" />;
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
