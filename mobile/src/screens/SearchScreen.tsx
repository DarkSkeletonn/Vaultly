import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";

export default function SearchScreen() {

    const [query, setQuery] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {

        fetch(
            `http://10.0.2.2:3000/items/search?q=${query}`
        )
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.log(err));

    }, [query]);

    return (
        <View style={styles.container}>
            <View style={styles.filterRow}>

                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>
                        Photos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>
                        Videos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>
                        Docs
                    </Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.title}>
                Search Vault
            </Text>

            <TextInput
                placeholder="Search photos, videos..."
                placeholderTextColor="#94A3B8"
                value={query}
                onChangeText={setQuery}
                style={styles.search}
            />
            <Text
                style={{
                    color: "white",
                    marginBottom: 10,
                }}
            >
                Results: {items.length}
            </Text>

            <FlatList
                data={items}
                keyExtractor={(item: any) =>
                    item.id.toString()
                }
                renderItem={({ item }: any) => (

                    <View style={styles.resultCard}>

                        <Image
                            source={{ uri: item.path }}
                            style={styles.resultImage}
                        />

                        <View style={styles.resultInfo}>

                            <Text
                                numberOfLines={1}
                                style={styles.name}
                            >
                                {item.title}
                            </Text>

                            <Text style={styles.type}>
                                {item.type}
                            </Text>

                        </View>

                    </View>

                )}
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
    resultCard: {
        flexDirection: "row",
        backgroundColor: "#1E293B",
        borderRadius: 14,
        padding: 10,
        marginBottom: 12,
        alignItems: "center",
    },

    resultImage: {
        width: 70,
        height: 70,
        borderRadius: 12,
    },

    resultInfo: {
        flex: 1,
        marginLeft: 12,
    },
    filterRow: {
        flexDirection: "row",
        marginBottom: 20,
    },

    filterChip: {
        backgroundColor: "#1E293B",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
    },

    filterText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },

    title: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },

    search: {
        backgroundColor: "#1E293B",
        color: "#FFFFFF",
        borderRadius: 16,
        padding: 15,
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#1E293B",
        borderRadius: 14,
        padding: 15,
        marginBottom: 10,
    },

    name: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },

    type: {
        color: "#94A3B8",
        marginTop: 5,
    },
});