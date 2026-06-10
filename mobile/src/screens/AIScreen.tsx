import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

export default function AIScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Ask Vaultly
      </Text>

      <Text style={styles.subtitle}>
        Your AI Memory Assistant
      </Text>

      <View style={styles.orb} />

      <Text style={styles.question}>
        Ask me anything about
        your memories.
      </Text>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>
          "Show my screenshots about React Native"
        </Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>
          "Find photos from my Manali trip"
        </Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>
          "Show my Instagram reels about motivation"
        </Text>
      </View>

      <TextInput
        placeholder="Ask anything..."
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 8,
  },

  orb: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#7C3AED",
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 40,
    opacity: 0.9,
  },

  question: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 25,
  },

  exampleCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  exampleText: {
    color: "#FFFFFF",
  },

  input: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
    color: "#FFFFFF",
    marginTop: 20,
  },
});