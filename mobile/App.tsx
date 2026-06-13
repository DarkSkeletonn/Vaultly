import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import FolderScreen from "./src/screens/FolderScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AIScreen from "./src/screens/AIScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ImagePreviewScreen from "./src/screens/ImagePreviewScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#1E293B",
          borderTopWidth: 0,
          height: 65,
        },

        tabBarActiveTintColor: "#8B5CF6",
        tabBarInactiveTintColor: "#94A3B8",

        tabBarIcon: ({ focused }) => {
          let icon = "🏠";

          switch (route.name) {
            case "Home":
              icon = "🏠";
              break;
            case "Search":
              icon = "🔍";
              break;
            case "AI":
              icon = "✨";
              break;
            case "Settings":
              icon = "⚙️";
              break;
          }

          return (
            <Text
              style={{
                fontSize: 18,
                opacity: focused ? 1 : 0.5,
              }}
            >
              {icon}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="AI" component={AIScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
        />

        <Stack.Screen
          name="Folder"
          component={FolderScreen}
        />

        <Stack.Screen
          name="ImagePreview"
          component={ImagePreviewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}