import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
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
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => {
              return (
                <Feather
                  name="home"
                  size={24}
                  color={focused ? "white" : "grey"}
                />
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
                <Feather
                  name="message-circle"
                  size={24}
                  color={focused ? "white" : "grey"}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: "Add",
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
                  <Feather name="plus" size={24} color="white" />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Statistics",
            tabBarIcon: ({ focused }) => {
              return (
                <Feather
                  name="bar-chart-2"
                  size={24}
                  color={focused ? "white" : "grey"}
                />
              );
            },
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => {
              return (
                <Feather
                  name="user"
                  size={24}
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
