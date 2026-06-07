import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  NativeModules,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";

export default function HomeScreen({ navigation }: any) {

  const [folders, setFolders] = useState<any[]>([]);

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
              folderId: 1
            })
          }
        );
      }

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

    } catch (error) {
      console.log(error);
    }
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

  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.logo}>📦</Text>

      <Text style={styles.title}>
        Vaultly
      </Text>

      <TextInput
        placeholder="Search your vault..."
        style={styles.search}
      />

      <Button
        title="Load Gallery"
        onPress={loadGallery}
      />

      <Button
        title="Load Videos"
        onPress={loadVideos}
      />

      <Button
        title="Load PDFs"
        onPress={loadPdfs}
      />

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

          <View style={styles.card}>
            <Text>
              📁 {folder.name}
            </Text>
          </View>

        </TouchableOpacity>

      ))}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 50,
    textAlign: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
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