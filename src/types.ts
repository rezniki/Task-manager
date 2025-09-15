export type TaskStatus = "new" | "in_progress" | "completed" | "canceled";

export interface Task {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    status: TaskStatus;
    createdAt: number;
}
