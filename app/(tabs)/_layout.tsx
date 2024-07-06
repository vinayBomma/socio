import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{ tabBarShowLabel: false }}>
        <Tabs.Screen
          name="home"
          options={{
            headerShown: true,
            title: "Home",
            tabBarIcon: ({ color, focused }) => {
              return <Feather name="home" size={24} color="black" />;
            },
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Groups",
            tabBarIcon: ({ color, focused }) => {
              return <Feather name="users" size={24} color="black" />;
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
              return <Feather name="settings" size={24} color="black" />;
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
