import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Task } from "../types";
import { loadTasks, saveTasks } from "../storage";

type Props = NativeStackScreenProps<RootStackParamList, "TaskDetail">;

export default function TaskDetailScreen({ route, navigation }: Props) {
    const { taskId } = route.params;
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        loadTasks().then((tasks) => {
        setTask(tasks.find((t) => t.id === taskId) || null);
        });
    }, [taskId]);

    const updateStatus = async (status: Task["status"]) => {
        const tasks = await loadTasks();
        const updated = tasks.map((t) => (t.id === taskId ? { ...t, status } : t));
        await saveTasks(updated);
        setTask(updated.find((t) => t.id === taskId) || null);
    };

    if (!task) return <Text>Задача не найдена</Text>;

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{task.title}</Text>
        <Text>Описание: {task.description}</Text>
        <Text>Дата: {task.date}</Text>
        <Text>Местоположение: {task.location}</Text>
        <Text>Статус: {task.status}</Text>
        <View style={styles.row}>
            <Button onPress={() => updateStatus("in_progress")}>В процессе</Button>
            <Button onPress={() => updateStatus("completed")}>Завершено</Button>
            <Button onPress={() => updateStatus("canceled")}>Отменено</Button>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 16, backgroundColor: "#fff" },
        title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
        row: { flexDirection: "row", justifyContent: "space-around", marginTop: 16 },
    });
