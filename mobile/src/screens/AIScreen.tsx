import LinearGradient from "react-native-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Pressable,
} from "react-native";

export default function AIScreen() {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.06,
                    duration: 1800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1800,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 0.6,
                    duration: 1800,
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0.3,
                    duration: 1800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.sparkle}>✨</Text>

                <Text style={styles.title}>
                    Ask Vaultly
                </Text>

                <Text style={styles.subtitle}>
                    Your AI Memory Assistant
                </Text>
            </View>

            {/* Orb */}
            <Animated.View
                style={[
                    styles.orbContainer,
                    { transform: [{ scale: scaleAnim }] },
                ]}
            >

                <View style={styles.bigGlow} />

                <LinearGradient
                    colors={[
                        "#050816",
                        "#0B1020",
                        "#7C3AED"
                    ]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.orbCore}
                >

                    <View style={styles.eyeRow}>
                        <View style={styles.eye} />
                        <View style={styles.eye} />
                    </View>

                </LinearGradient>

            </Animated.View>

            {/* Question text */}
            <Text style={styles.question}>
                Ask me anything about{"\n"}
                your <Text style={{ color: "#8B5CF6" }}>memories</Text>.
            </Text>

            {/* Examples Section */}
            <View style={styles.examplesSection}>
                <Text style={styles.examplesLabel}>Examples</Text>

                {[
                    '"Show my screenshots about\nReact Native"',
                    '"Find photos from my Manali trip"',
                    '"Show my Instagram reels about\nmotivation"',
                ].map((text, index) => (
                    <Pressable
                        key={index}
                        style={({ pressed }) => [
                            styles.exampleCard,
                            pressed && styles.exampleCardPressed,
                        ]}
                    >
                        <Text style={styles.exampleText}>{text}</Text>
                        <Text style={styles.arrowIcon}>→</Text>
                    </Pressable>
                ))}
            </View>

            {/* Input Row */}
            <View style={styles.inputRow}>
                <TextInput
                    placeholder="Ask anything..."
                    placeholderTextColor="#4A5568"
                    style={styles.input}
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendIcon}>↑</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D1117",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    sparkle: {
        position: "absolute",
        right: 0,
        top: 10,
        color: "#8B5CF6",
        fontSize: 20,
    },

    header: {
        alignItems: "center",
        position: "relative",
    },

    title: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 20,
    },

    subtitle: {
        color: "#6B7280",
        fontSize: 13,
        textAlign: "center",
        marginTop: 5,
    },

    orbContainer: {
        width: 260,
        height: 260,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 28,
        marginBottom: 28,
    },

    bigGlow: {
        position: "absolute",

        width: 220,
        height: 220,
        borderRadius: 110,

        backgroundColor: "#8B5CF6",

        opacity: 0.12,

        shadowColor: "#8B5CF6",
        shadowOpacity: 1,
        shadowRadius: 140,

        elevation: 60,
    },


    orbCore: {
        width: 170,
        height: 170,

        borderRadius: 85,

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#8B5CF6",
        shadowOpacity: 1,
        shadowRadius: 30,

        elevation: 25,
    },
    eyeRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12,
    },

    eye: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#A78BFA",
        marginHorizontal: 10,
        shadowColor: "#A78BFA",
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
    },

    question: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        lineHeight: 26,
        marginBottom: 24,
    },

    examplesSection: {
        flex: 1,
    },

    examplesLabel: {
        color: "#6B7280",
        fontSize: 13,
        fontWeight: "500",
        marginBottom: 10,
        letterSpacing: 0.3,
    },

    exampleCard: {

        backgroundColor: "rgba(25,30,45,0.75)",
        borderWidth: 0,

        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        borderColor: "#232A3A",
    },

    exampleCardPressed: {
        backgroundColor: "#1C2333",
        borderColor: "#7C3AED",
    },

    exampleText: {
        color: "#D1D5DB",
        fontSize: 13.5,
        flex: 1,
        lineHeight: 20,
    },

    arrowIcon: {
        color: "#6B7280",
        fontSize: 16,
        marginLeft: 10,
    },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#111827",
        borderColor: "#1B2335",

        borderRadius: 16,
        paddingLeft: 16,
        paddingRight: 6,
        paddingVertical: 6,
        marginBottom: 16,
        marginTop: 8,
        borderWidth: 1,

    },

    input: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 14,
        paddingVertical: 8,
    },

    sendButton: {
        backgroundColor: "#7C3AED",
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    sendIcon: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 20,
    },
});
