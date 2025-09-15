import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Task } from "../types";

type Props = {
    task: Task;
    onPress: () => void;
};

export default function TaskItem({ task, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.row}>
            <View style={styles.info}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.date}>{task.date}</Text>
            </View>
            <View style={styles.statusBox}>
            <Text style={[styles.status, statusColors[task.status]]}>
                {statusLabels[task.status]}
            </Text>
            </View>
        </View>
        </TouchableOpacity>
    );
}

const statusLabels: Record<Task["status"], string> = {
    new: "Новая",
    in_progress: "В процессе",
    completed: "Завершена",
    canceled: "Отменена",
};

const statusColors: Record<Task["status"], object> = {
    new: { color: "#007AFF" },
    in_progress: { color: "#FF9500" },
    completed: { color: "#34C759" },
    canceled: { color: "#FF3B30" },
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginVertical: 6,
        marginHorizontal: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
        color: "#1c1c1e",
    },
    date: {
        fontSize: 14,
        color: "#6e6e73",
    },
    statusBox: {
        marginLeft: 10,
    },
    status: {
        fontSize: 14,
        fontWeight: "500",
    },
});
