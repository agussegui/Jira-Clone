"use client"

import { Fragment } from "react";
import Link from "next/link";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";

import { useWorkspaceId } from "../hooks/use-workspace-id"
import { useConfirm } from "@/hooks/use-confirm";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useDeleteMembers } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-sepator";

import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";





export const MembersList = () => {

    const workspaceId = useWorkspaceId();
    const [ConfirmDialog, confirm] = useConfirm(
        "Eliminar Colaborador",
        "Este Colaborador sera eliminado del area de trabajo",
        "destructive"
    );
    const {data} = useGetMembers({workspaceId})
        
    const {
        mutate: deleteMember,
        isPending: isDeletingMember
    } = useDeleteMembers();
    const {
        mutate: updateMember,
        isPending: isUpdatingMember
    } = useUpdateMember();

    const handleUpdateMember = (memberId: string, role: MemberRole) => {

        updateMember({
            json:{role},
            param: {memberId},
        });
    }
    const handleDeleteMember = async (memberId: string) => {
        const ok = await confirm(); 
        if(!ok) return; 
        deleteMember({param:{memberId}},{
            onSuccess: () => {
                window.location.reload()
            },}
        );
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <ConfirmDialog/>
            <CardHeader className="flex flex-row items-center gap-x-4 py-7 space-y-0">
                <Button asChild variant="secondary" size="sm">
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className="size-4 mr-2"/>
                        Volver
                    </Link>
                </Button>
                <CardTitle className="text-xl font-bold">
                    Lista de Colaboradores
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                {data?.documents.map((member, index)=> (
                    <Fragment key={member.$id}>
                        <div className="flex items-center gap-2">
                            <MemberAvatar
                                className="size-12"
                                fallbackClassName="text-lg"
                                name={member.name}
                            />
                            <div className="flex flex-col">
                                <p className="text-md font-medium">{member.name}</p>
                                <p className="text-sm font-muted-foreground">{member.email}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="ml-auto"
                                        variant="secondary"
                                        size="icon"
                                    >
                                        <MoreVerticalIcon className="size-4 text-muted-foreground"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem
                                        className="font-medium"
                                        onClick={() => handleUpdateMember(member.$id,MemberRole.ADMIN)}
                                        disabled={isUpdatingMember}
                                    >
                                        Establecer como Administrador
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium"
                                        onClick={() => handleUpdateMember(member.$id,MemberRole.MEMBER)}
                                        disabled={isUpdatingMember}
                                    >
                                        Establecer como Colaborador
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium text-red-700"
                                        onClick={() => handleDeleteMember(member.$id)}
                                        disabled={isDeletingMember}
                                    >
                                        Eliminar a {member.name}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                        {index < data.documents.length - 1 && (
                            <Separator className="my-2.5"/>
                        )}
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    )
}