import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from "react-native";

const getFolderIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "photos":
      return "🖼️";
    case "videos":
      return "🎥";
    case "documents":
      return "📄";
    case "instagram":
      return "📸";
    case "pinterest":
      return "📌";
    default:
      return "📁";
  }
};

export default function HomeScreen({ navigation }: any) {

  const [folders, setFolders] = useState<any[]>([]);

  const [folderStats, setFolderStats] = useState<any[]>([]);

  const { GalleryModule } = NativeModules;

  const requestPermission = async () => {

    if (Platform.OS !== "android") {
      return true;
    }

    const imagePermission =
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      );

    const videoPermission =
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
      );

    return (
      imagePermission === PermissionsAndroid.RESULTS.GRANTED &&
      videoPermission === PermissionsAndroid.RESULTS.GRANTED
    );
  };

  const loadGallery = async () => {

    const hasPermission =
      await requestPermission();

    if (!hasPermission) {
      return;
    }

    try {

      const images =
        await GalleryModule.getImages();

      for (const image of images) {

        const text =
          await GalleryModule.extractText(
            image.uri
          );

        await fetch(
          "http://10.0.2.2:3000/items/index",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: image.name,
              path: image.uri,
              type: "photo",
              content: text,
              folderId: 1
            })
          }
        );
      }

      refreshFolderStats();

    } catch (error) {
      console.log(error);
    }
  };

  const loadVideos = async () => {

    try {

      const videos =
        await GalleryModule.getVideos();

      for (const video of videos) {

        await fetch(
          "http://10.0.2.2:3000/items/index",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: video.name,
              path: video.uri,
              type: "video",
              folderId: 2
            })
          }
        );
      }

      refreshFolderStats();

    } catch (error) {
      console.log(error);
    }
  };

  const refreshFolderStats = () => {

    fetch("http://10.0.2.2:3000/folders/stats")
      .then(response => response.json())
      .then(data => {
        setFolderStats(data);
      })
      .catch(error => {
        console.log(error);
      });

  };

  const loadPdfs = async () => {

    try {

      const pdfs =
        await GalleryModule.getPdfs();

      console.log(pdfs);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetch("http://10.0.2.2:3000/folders")
      .then(response => response.json())
      .then(data => {
        setFolders(data);
      })
      .catch(error => {
        console.log(error);
      });

    refreshFolderStats();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.logo}>🔒</Text>

        <Text style={styles.title}>
          Vaultly
        </Text>

        <Text style={styles.subtitle}>
          Welcome Back 👋
        </Text>

        <Text style={styles.tagline}>
          Your memories, organized and searchable.
        </Text>

        <TextInput
          placeholder="🔍 Search anything..."
          placeholderTextColor="#94A3B8"
          style={styles.search}
        />

        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.quickGrid}>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={loadGallery}
          >
            <Text style={styles.quickIcon}>🖼️</Text>
            <Text style={styles.quickTitle}>Photos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={loadVideos}
          >
            <Text style={styles.quickIcon}>🎥</Text>
            <Text style={styles.quickTitle}>Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={loadPdfs}
          >
            <Text style={styles.quickIcon}>📄</Text>
            <Text style={styles.quickTitle}>Documents</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
          >
            <Text style={styles.quickIcon}>🔗</Text>
            <Text style={styles.quickTitle}>Save Link</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.sectionTitle}>
          Your Vault
        </Text>

        {folders.map((folder) => (

          <TouchableOpacity
            key={folder.id}
            onPress={() =>
              navigation.navigate(
                "Folder",
                {
                  folderId: folder.id,
                  folderName: folder.name
                }
              )
            }
          >

            <View style={styles.folderCard}>

              <View>

                <Text style={styles.folderName}>
                  {getFolderIcon(folder.name)} {folder.name}
                </Text>

                <Text style={styles.folderSub}>
                  All your {folder.name.toLowerCase()}
                </Text>

              </View>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {
                    folderStats.find(
                      (f) => f.id === folder.id
                    )?.count ?? 0
                  }
                </Text>
              </View>

            </View>

          </TouchableOpacity>

        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0F172A",
  },

  logo: {
    fontSize: 60,
    textAlign: "center",
    marginTop: 25,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },

  subtitle: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 15,
  },

  tagline: {
    textAlign: "center",
    color: "#94A3B8",
    marginTop: 8,
    marginBottom: 25,
    fontSize: 15,
  },

  search: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 16,
    color: "#FFFFFF",
    marginBottom: 25,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  quickCard: {
    width: "48%",
    backgroundColor: "#1E293B",
    borderRadius: 20,
    paddingVertical: 25,
    alignItems: "center",
    marginBottom: 12,
  },

  quickIcon: {
    fontSize: 28,
    marginBottom: 10,
  },

  quickTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  folderCard: {
    shadowColor: "#7C3AED",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  folderName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  folderSub: {
    color: "#94A3B8",
    marginTop: 4,
    fontSize: 13,
  },

  badge: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },



  arrow: {
    color: "#8B5CF6",
    fontSize: 22,
    fontWeight: "bold",
  },
});