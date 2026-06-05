import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>📦</Text>

      <Text style={styles.title}>Vaultly</Text>

      <TextInput
        placeholder="Search your vault..."
        style={styles.search}
      />

      <View style={styles.card}>
        <Text>📁 Fashion</Text>
      </View>

      <View style={styles.card}>
        <Text>📁 Study</Text>
      </View>

      <View style={styles.card}>
        <Text>📁 Travel</Text>
      </View>

      <View style={styles.card}>
        <Text>📁 Saved Reels</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  search: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    marginBottom: 10,
  },
});
