import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

export default function FolderScreen({ route }: any) {

  const { folderId, folderName } = route.params;

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {

    fetch(
      `http://10.0.2.2:3000/folders/${folderId}/items`
    )
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err));

  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {folderName}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Text>{item.type}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});