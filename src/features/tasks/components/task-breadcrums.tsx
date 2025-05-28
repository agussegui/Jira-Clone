import { Project } from "@/features/projects/types";
import { Task } from "../types";
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import Link from "next/link";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTask } from "../api/use-delete-task";
import { useRouter } from "next/navigation";

interface TaskBreadcrumbsProps {
    project: Project;
    task: Task;
}

export const TaskBreadcrums = ({project, task}: TaskBreadcrumbsProps) => {

    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { mutate, isPending } = useDeleteTask();
    const [ConfirmDialog, confirm] = useConfirm(
      'Eliminar Tarea',
      'Estas seguro que quieres eliminar esta tarea? Esta acción no se puede revertir.',
      'destructive'
    );

    const handleDelete = async () => {
      const ok = await confirm();
      if (!ok) return;

      mutate(
        { param: { taskId: task.$id } },
        {
          onSuccess: () => {
            router.push(`/workspaces/${workspaceId}/tasks`);
          },
        }
      );
    };
    return (
        <div className="flex items-center gap-x-2">
            <ConfirmDialog/>
            <ProjectAvatar
                name={project.name}
                image={project.imageUrl}
                className="size-6 lg:size-8 "
            />
            <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
                    {project.name}
                </p>
            </Link>
            <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground"/>
            <p className="text-sm lg:text-lg font-semibold">
                {task.name}
            </p>
            <Button
                onClick={handleDelete}
                disabled={isPending}
                className="ml-auto"
                variant="destructive"
                size="sm"
            >
                <TrashIcon className="size-4 lg:mr-1.5" />
                <span className="hidden lg:block">Eliminar Tarea</span>
            </Button>
        </div>
    )
}
