import { Models } from "node-appwrite";

export enum TaskStatus {
    PENDIENTE = "PENDIENTE",
    HACER = "HACER",
    EN_PROGRESO = "EN_PROGRESO",
    EN_REVISION = "EN_REVISION",
    TERMINADO = "TERMINADO"

}


export type Task = Models.Document & {
  name: string;
  description?: string;
  status: TaskStatus;
  workspaceId: string;
  assigneeId: string;
  projectId: string;
  position: number;
  dueDate: string;
};