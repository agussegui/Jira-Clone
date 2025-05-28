"use client"

import { snakeCasetoTitleCase } from "@/lib/utils";
import { TaskStatus } from "../types"

import {
    CircleCheckIcon,
    CircleDashedIcon,
    CircleDotDashedIcon,
    CircleDotIcon,
    CircleIcon,
    PlusIcon
} from "lucide-react"
import { Button } from "@/components/ui/button";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";


interface KanbanColumnHeaderProps {
    board: TaskStatus;
    taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
    [TaskStatus.PENDIENTE]: (
        <CircleDashedIcon className="size-[20px] font-bold text-pink-400"/>
    ),
    [TaskStatus.HACER]: (
        <CircleIcon className="size-[20px] font-bold text-red-400"/>
    ),
    [TaskStatus.EN_PROGRESO]: (
        <CircleDotDashedIcon className="size-[20px] font-bold text-yellow-400"/>
    ),
    [TaskStatus.EN_REVISION]: (
        <CircleDotIcon className="size-[20px] font-bold text-blue-400"/>
    ),
    [TaskStatus.TERMINADO]: (
        <CircleCheckIcon className="size-[20px] font-bold text-green-400"/>
    ),
}
    
export const KanbanColumnHeader = ({board, taskCount}: KanbanColumnHeaderProps) => {
    const {open} = useCreateTaskModal()
    const icon = statusIconMap[board]
    return (
        <div className="px-2 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                {icon}
                <h2 className="text-sm font-medium">{snakeCasetoTitleCase(board)}</h2>
                <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
                    {taskCount}
                </div>
            </div>  
            <Button onClick={open} variant="ghost" size="icon" className="size-6">
                <PlusIcon className="size-4 text-neutral-400"/>
            </Button>
        </div>
    )
}