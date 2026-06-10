import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

export default function FolderScreen({
  route,
  navigation,
}: any) {

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
        numColumns={2}
        keyExtractor={(item: any) =>
          item.id.toString()
        }
        renderItem={({ item }: any) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate(
                "Folder",
                {
                  folderId: 1,
                  folderName: "Photos",
                }
              );
            }}
          >
            <Image
              source={{ uri: item.path }}
              style={styles.thumbnail}
            />

            <Text
              numberOfLines={1}
              style={styles.itemTitle}
            >
              {item.title}
            </Text>

          </TouchableOpacity>

        )
        }
      />

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 15,
  },
  thumbnail: {
    width: "100%",
    height: 140,
    borderRadius: 14,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  itemTitle: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 13,
  },

  card: {
    flex: 1,
    margin: 6,
  },

  imagePlaceholder: {
    height: 120,
    borderRadius: 14,
    backgroundColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  imageIcon: {
    fontSize: 40,
  },

  fileName: {
    color: "#FFFFFF",
    fontSize: 11,
    marginTop: 4,
  },

  fileType: {
    color: "#94A3B8",
    marginTop: 4,
  },
});