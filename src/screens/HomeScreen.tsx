import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Task } from "../types";
import { loadTasks, saveTasks } from "../storage";
import  TaskItem  from "../components/TaskItem";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        loadTasks().then(setTasks);
    }, []);

    const handleDelete = async (id: string) => {
        const updated = tasks.filter((t) => t.id !== id);
        setTasks(updated);
        await saveTasks(updated);
    };

    return (
        <View style={styles.container}>
        {tasks.length === 0 ? (
            <Text>Нет задач. Добавьте первую задачу!</Text>
        ) : (
            <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TaskItem
                    task={item}
                    onPress={() => navigation.navigate("TaskDetail", { taskId: item.id })}
                />
            )}
            />
        )}
        <Button mode="contained" onPress={() => navigation.navigate("AddTask")}>
            Добавить задачу
        </Button>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    taskCard: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 12,
    },
    taskTitle: { fontSize: 18, fontWeight: "bold" },
    row: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});
