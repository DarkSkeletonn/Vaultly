import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Text,
  NativeModules,
  NativeEventEmitter,
} from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import FolderScreen from "./src/screens/FolderScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AIScreen from "./src/screens/AIScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

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

          if (route.name === "Home") icon = "🏠";
          if (route.name === "Search") icon = "🔍";
          if (route.name === "AI") icon = "✨";
          if (route.name === "Settings") icon = "⚙️";

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
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />

      <Tab.Screen
        name="AI"
        component={AIScreen}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {

  const { ShareModule } = NativeModules;

  useEffect(() => {

    const emitter =
      new NativeEventEmitter(
        ShareModule
      );

    const subscription =
      emitter.addListener(
        "VaultlyShareReceived",
        async (sharedText) => {

          console.log(
            "SHARE RECEIVED =",
            sharedText
          );

          try {

            await fetch(
              "http://10.0.2.2:3000/items/share",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  sharedText
                })
              }
            );

            console.log(
              "Saved to Vaultly"
            );

          } catch (error) {

            console.log(error);

          }
        }
      );

    return () => {
      subscription.remove();
    };

  }, []);

  return (
    <NavigationContainer>

      <Stack.Navigator
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

      </Stack.Navigator>

    </NavigationContainer>
  );
}