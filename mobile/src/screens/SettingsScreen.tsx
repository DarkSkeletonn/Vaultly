import React from "react";
import { View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
        }}
      >
        Settings
      </Text>
    </View>
  );
}