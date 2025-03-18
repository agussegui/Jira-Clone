import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
    name: z.string().trim().min(1, 'Este Campo es Obligatorio'),
    status: z.nativeEnum(TaskStatus, {required_error: 'Obligatorio'}), 
    workspaceId: z.string().trim().min(1, 'Obligatorio'),
    projectId: z.string().trim().min(1, 'Obligatorio'),
    dueDate: z.coerce.date(),
    assigneeId: z.string().trim().min(1, 'Obligatorio'),
    description: z.string().optional(),
})