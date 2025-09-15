import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
import TaskDetailScreen from "./screens/TaskDetailScreen";

export type RootStackParamList = {
  Home: undefined;
  AddTask: undefined;
  TaskDetail: { taskId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Задачи" }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: "Добавить задачу" }} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: "Детали задачи" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

