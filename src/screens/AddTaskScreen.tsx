import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Task } from "../types";
import { loadTasks, saveTasks } from "../storage";
import uuid from "react-native-uuid";

type Props = NativeStackScreenProps<RootStackParamList, "AddTask">;

export default function AddTaskScreen({ navigation }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    const handleSave = async () => {
        if (title.length < 2) {
        setError("Название должно быть не короче 2 символов");
        return;
        }
        if (!date) {
        setError("Дата обязательна");
        return;
        }

        const newTask: Task = {
        id: uuid.v4().toString(),
        title,
        description,
        date,
        location,
        status: "new",
        createdAt: Date.now(),
        };

        const tasks = await loadTasks();
        const updated = [...tasks, newTask];
        await saveTasks(updated);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <TextInput label="Название" value={title} onChangeText={setTitle} style={styles.input} />
        <TextInput label="Описание" value={description} onChangeText={setDescription} style={styles.input} />
        <TextInput label="Дата и время" value={date} onChangeText={setDate} style={styles.input} />
        <TextInput label="Местоположение" value={location} onChangeText={setLocation} style={styles.input} />
        <Button mode="contained" onPress={handleSave}>
            Сохранить
        </Button>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    input: { marginBottom: 12 },
});
