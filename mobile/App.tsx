import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [folders, setFolders] = useState<any[]>([]);

  useEffect(() => {
  fetch("http://10.0.2.2:3000/folders")
    .then(response => response.json())
    .then(data => {
      setFolders(data);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>📦</Text>

      <Text style={styles.title}>Vaultly</Text>

      <TextInput
        placeholder="Search your vault..."
        style={styles.search}
      />

      {folders.map((folder) => (
        <View
          key={folder.id}
          style={styles.card}
        >
          <Text>📁 {folder.name}</Text>
        </View>
      ))}
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
