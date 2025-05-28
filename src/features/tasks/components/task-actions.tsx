import { useConfirm } from "@/hooks/use-confirm";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 

} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteTask } from "../api/use-delete-task";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";


interface TaskActionsProps {
    id: string;
    projectId: string;
    children: React.ReactNode
}

export const TaskActions = ({id, projectId, children}: TaskActionsProps) => {
    const workspaceId = useWorkspaceId(); 
    const router = useRouter();
    const {open} = useEditTaskModal();

    const [ConfirmDialog, confirm] = useConfirm(
        "Eliminar Tarea",
        "Esta acción no se puede deshacer",
        "destructive"
    )
    const {mutate, isPending} = useDeleteTask()
    
    const onDelete = async () => {
        const ok = await confirm()
        if(!ok) return

        mutate({param:{ taskId: id}})
    }
    
    const onOpenTask = () => {
      router.push(`/workspaces/${workspaceId}/tasks/${id}`);
    };
    const onOpenProject = () => {
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
    };

    return (
        <div className="flex justify-end">
            <ConfirmDialog/>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                        onClick={onOpenTask}
                        className="font-medium p-[10px]"
                    >
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2"/>
                        Detalles de la Tarea
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onOpenProject}
                        className="font-medium p-[10px]"
                    >
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2"/>
                        Abrir Proyecto
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => open(id)}
                        className="font-medium p-[10px]"
                    >
                        <PencilIcon className="size-4 mr-2 stroke-2"/>
                        Editar Tarea
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onDelete}
                        disabled={isPending}
                        className=" text-amber-800 focus:text-amber-800 font-medium p-[10px]"
                    >
                        <TrashIcon className="size-4 mr-2 stroke-2"/>
                        Eliminar Tarea
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}