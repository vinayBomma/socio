import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import supabase from "../lib/supabase";
import { router } from "expo-router";

const GoogleAuth = () => {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId:
      "562535335015-r5n8mkj7oa0ifa1n22dsioi36r0hfujo.apps.googleusercontent.com",
  });

  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfo", JSON.stringify(userInfo));
      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken,
        });
        console.log(data);
        if (data) {
          router.push("/profile");
        }
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handleGoogleSignin}
      className="flex-row bg-slate-100 rounded m-2 justify-center items-center"
    >
      <Image className="w-6 h-6" source={require("./../assets/google.png")} />
      <Text className="text-lg m-3 text-center">Continue with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleAuth;
