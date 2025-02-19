'use client';

import { PlusIcon, Calendar, Settings } from 'lucide-react';

import { PageLoader } from '@/components/page-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useGetMembers } from '@/features/members/api/use-get-members';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';
import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';
import { Task } from '@/features/tasks/types';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Project } from '@/features/projects/types';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { UseGetWorkspaceAnalytics } from '@/features/workspaces/api/use-get-workspace-analytics';
import { PageError } from '@/components/page-error';
import { Analytics } from '@/components/analytics';
import { DottedSeparator } from '@/components/dotted-sepator';
import { Member } from '@/features/members/types';

export const WorkspaceIdClient = () => {
  const workspaceId = useWorkspaceId();
  const { data: analytics, isFetching: isLoadingAnalytics } = UseGetWorkspaceAnalytics({ workspaceId });
  const { data: projects, isFetching: isLoadingProjects } = useGetProjects({workspaceId,});
  const { data: tasks, isFetching: isLoadingTasks } = useGetTasks({workspaceId,});
  const { data: members, isFetching: isLoadingMembers } = useGetMembers({workspaceId,});

  const isLoading =
    isLoadingAnalytics ||
    isLoadingProjects ||
    isLoadingTasks ||
    isLoadingMembers;

  if (isLoading) return <PageLoader />;

  if (!analytics || !projects || !tasks || !members) {
    return <PageError message="No se pudieron cargar los datos del espacio de trabajo" />;
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList data={tasks.documents} total={tasks.total} />
        <ProjectList data={projects.documents} total={projects.total} />
        <MemberList data={members.documents} total={members.total} />
      </div>
    </div>
  );
};

interface TaskListProps {
  data: Task[];
  total?: number;
}

export const TaskList = ({ data, total }: TaskListProps) => {
  const workspaceId = useWorkspaceId();
  const { open } = useCreateTaskModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tareas ({total})</p>
          <Button variant="muted" size="icon" onClick={open}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {data.map((task) => (
            <li key={task.$id}>
              <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4">
                    <p className="text-lg font-medium truncate">{task.name}</p>
                    <div className="flex items-center gap-x-2">
                      <ProjectAvatar
                        name={task.project?.name}
                        image={task.project?.imageUrl}
                      />
                      <p>{task.project?.name}</p>
                      <div className="size-1 rounded-full bg-neutral-300" />
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="size-3 mr-1" />
                        <span className="truncate">
                          {formatDistanceToNow(new Date(task.dueDate))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground hidden first-of-type:block">
            No Hay Tareas
          </li>
        </ul>
        <Button variant="muted" className="mt-4 w-full" asChild>
          <Link href={`/workspaces/${workspaceId}/tasks`}>Mostrar Todo</Link>
        </Button>
      </div>
    </div>
  );
};

interface ProjectListProps {
  data: Project[];
  total?: number;
}

export const ProjectList = ({ data, total }: ProjectListProps) => {
  const workspaceId = useWorkspaceId();
  const { open } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Proyectos ({total})</p>
          <Button variant="secondary" size="icon" onClick={open}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((project) => (
            <li key={project.$id}>
              <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <ProjectAvatar
                      name={project.name}
                      image={project.imageUrl}
                      className="size-12"
                      fallbackClassName="text-lg"
                    />
                    <p className="text-lg font-medium truncate">
                      {project.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground hidden first-of-type:block">
            No Hay Proyectos
          </li>
        </ul>
      </div>
    </div>
  );
};

interface MemberListProps {
  data: Member[];
  total?: number;
}

export const MemberList = ({ data, total }: MemberListProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Colaboradores ({total})</p>
          <Button variant="secondary" size="icon" asChild>
            <Link href={`/workspaces/${workspaceId}/members`}>
              <Settings className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          {data.map((member) => (
            <li key={member.$id}>
              <Card className="shadow-none rounded-lg overflow-hidden">
                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                  <MemberAvatar
                    name={member.name}
                    className="size-10"
                    fallbackClassName="text-md"
                  />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-lg font-medium line-clamp-1">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium line-clamp-1">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground hidden first-of-type:block">
            No Hay Colaboradores 
          </li>
        </ul>
      </div>
    </div>
  );
};