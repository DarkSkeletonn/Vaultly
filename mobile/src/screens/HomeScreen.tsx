import React, { useEffect, useState } from "react";
import { Image } from "react-native";
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
  const getFolderColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "photos":
        return "#5E5BE6";

      case "videos":
        return "#5D76CB";

      case "documents":
        return "#53895F";

      case "instagram":
        return "#E35AA5";

      case "pinterest":
        return "#E35AA5";

      default:
        return "#7C3AED";
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

        <View style={styles.header}>
          <View style={styles.menuBtn}>
            <Text style={styles.headerIcon}>☰</Text>
          </View>
          <Text style={styles.logoText}>
            Vaultly
          </Text>
          <View style={styles.profileBtn}>
            <Text style={styles.headerIcon}>👤</Text>
          </View>
        </View>

        <Text style={styles.goodMorning}>
          Good Morning 👋
        </Text>

        <Text style={styles.welcome}>
          Welcome{" "}
          <Text style={styles.welcomePurple}>
            Back
          </Text>
        </Text>

        <Text style={styles.tagline}>
          Your memories, organized and searchable.
        </Text>

        <View style={styles.search}>
          <Image
            source={require("./icons/search.png")}
            style={{
              width: 24,
              height: 24,
            }}
          />

          <TextInput
            placeholder="Search anything..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />

          <Text style={styles.searchIcon}>✨</Text>
        </View>

        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.quickGrid}>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={loadGallery}
          >
            <View style={styles.iconBoxPurple}>
              <Image
                source={require("./icons/photo.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </View>

            <Text style={styles.quickTitle}>
              Photos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={loadVideos}
          >
            <View style={styles.iconBoxBlue}>
              <Image
                source={require("./icons/video.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </View>

            <Text style={styles.quickTitle}>
              Videos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={loadPdfs}
          >
            <View style={styles.iconBoxGreen}>
              <Text style={styles.quickIcon}>📄</Text>
            </View>

            <Text style={styles.quickTitle}>
              Documents
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
          >
            <View style={styles.iconBoxPink}>
              <Text style={styles.quickIcon}>🔗</Text>
            </View>

            <Text style={styles.quickTitle}>
              Save Link
            </Text>
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

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >

                <View
                  style={[
                    styles.folderIconBox,
                    {
                      backgroundColor: getFolderColor(folder.name),
                    },
                  ]}
                >
                  <Text style={styles.folderIcon}>
                    {getFolderIcon(folder.name)}
                  </Text>
                </View>

                <View>
                  <Text style={styles.folderName}>
                    {folder.name}
                  </Text>

                  <Text style={styles.folderSub}>
                    All your {folder.name.toLowerCase()}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {
                      folderStats.find(
                        (f) => f.id === folder.id
                      )?.count ?? 0
                    }
                  </Text>
                </View>

                <Text style={styles.arrow}>
                  →
                </Text>
              </View>

            </View>

          </TouchableOpacity>

        ))}

      </ScrollView>
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#050816",
  },
  folderIconBox: {
    width: 46,
    height: 46,
    borderRadius: 9,
    backgroundColor: "#6D4AFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  folderIcon: {
    fontSize: 22,
  },
  fab: {
    position: "absolute",

    right: 20,
    bottom: 10,

    width: 54,
    height: 54,

    borderRadius: 32,

    backgroundColor: "#7C3AED",

    justifyContent: "center",
    alignItems: "center",

    elevation: 12,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
  },

  fabText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "300",
  },
  iconBoxPurple: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#5E5BE6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  iconBoxBlue: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#5D76CB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  iconBoxGreen: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#53895F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  iconBoxPink: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#A13E74",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  menuBtn: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },

  profileBtn: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
  },


  headerIcon: {
    color: "#FFF",
    fontSize: 20,
  },

  goodMorning: {
    color: "#A1A1AA",
    marginTop: 20,
    fontSize: 15,
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
    marginTop: 6,
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


  tagline: {
    textAlign: "left",
    color: "#7C8AA5",
    marginTop: 8,
    marginBottom: 25,
    fontSize: 15,
  },

  search: {
    backgroundColor: "#1B2438",
    borderRadius: 30,
    height: 62,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 18,

    marginTop: 20,
    marginBottom: 30,
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    marginHorizontal: 10,
  },

  searchIcon: {
    fontSize: 22,
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
    width: "23%",

    backgroundColor: "#151F35",

    borderRadius: 10,

    height: 117,

    justifyContent: "center",
    alignItems: "center",
  },

  quickIcon: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 4,
  },

  quickTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",

    marginTop: 10,
  },
  welcomePurple: {
    color: "#6f38f1",
  },

  folderCard: {
    shadowColor: "#7C3AED",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 12,
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
    backgroundColor: "#3F3B77",

    minWidth: 50,
    height: 30,

    paddingHorizontal: 16,

    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },



  arrow: {
    color: "#FFFFFF",
    fontSize: 24,
    marginLeft: 12,
  },
});