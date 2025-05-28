import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectSeparator, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { FolderIcon, ListCheckIcon, UserIcon } from "lucide-react"
import { TaskStatus } from "../types"
import { useTaskFilters } from "../hooks/use-task-filters"

interface DataFiltersProps {
    hideProjectFilter?: boolean
}

export const DataFilters = ({hideProjectFilter}:DataFiltersProps) => {

    const workspaceId = useWorkspaceId()
    
    const {data: projects, isLoading: isLoadingProjects} = useGetProjects({workspaceId})
    const {data: members, isLoading: isLoadingMembers} = useGetMembers({workspaceId})

    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.documents.map((project) => ({
        value: project.$id,
        label: project.name
    }))

    const memberOptions = members?.documents.map((member) => ({
        value: member.$id,
        label: member.name
    }))

    const [{status, assigneeId, projectId, dueDate},setFilters] = useTaskFilters()

    const onStatusChange = (value: string) => {
        setFilters({status: value === "all" ? null : value as TaskStatus})
    }

    const onAssigneeChange = (value: string) => {
        setFilters({assigneeId: value === "all" ? null : value as string})
    }

    const onProjectChange = (value: string) => {
        setFilters({projectId: value === "all" ? null : value as string})
    }

    if(isLoading) return null;


    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select
                defaultValue={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListCheckIcon className="size-4 mr-2"/>
                        <SelectValue placeholder="Todos las Asignaciones"/>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectContent >
                        <SelectItem value="all">Todos los Estados</SelectItem>
                        <SelectSeparator/>
                        <SelectItem value={TaskStatus.PENDIENTE}>Pendiente</SelectItem>
                        <SelectItem value={TaskStatus.EN_PROGRESO}>En Progreso</SelectItem>
                        <SelectItem value={TaskStatus.EN_REVISION}>En Revisión</SelectItem>
                        <SelectItem value={TaskStatus.HACER}>Hacer</SelectItem>
                        <SelectItem value={TaskStatus.TERMINADO}>Terminado</SelectItem>
                    </SelectContent>
                </SelectContent>
            </Select>
            <Select
                defaultValue={assigneeId ?? undefined}
                onValueChange={(value) => onAssigneeChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2"/>
                        <SelectValue placeholder="Todos los Colaboradores"/>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectContent >
                        <SelectItem value="all">Todos los Colaboradores</SelectItem>
                        <SelectSeparator/>
                        {memberOptions?.map((member) => (
                            <SelectItem key={member.value} value={member.value}>
                                {member.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectContent>
            </Select>
            {!hideProjectFilter && (            
                <Select
                    defaultValue={projectId ?? undefined}
                    onValueChange={(value) => onProjectChange(value)}
                >
                    <SelectTrigger className="w-full lg:w-auto h-8">
                        <div className="flex items-center pr-2">
                            <FolderIcon className="size-4 mr-2"/>
                            <SelectValue placeholder="Todos los Proyectos "/>
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectContent >
                            <SelectItem value="all">Todos los Proyectos</SelectItem>
                            <SelectSeparator/>
                            {projectOptions ?.map((project) => (
                                <SelectItem key={project.value} value={project.value}>
                                    {project.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectContent>
                </Select>
                )}
                <DatePicker
                    placeholder="Fecha"
                    className="h-8 w-full lg:w-auto"
                    value={dueDate ? new Date(dueDate) : undefined}
                    onChange={(date) => {
                        setFilters({dueDate: date ? date.toISOString() : null})
                    }}
                />
        </div>
    )
}