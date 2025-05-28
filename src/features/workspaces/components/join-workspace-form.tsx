"use client"

import Link from "next/link";
import { DottedSeparator } from "@/components/dotted-sepator";
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    };
}

export const JoinWorkspaceForm = ({initialValues}: JoinWorkspaceFormProps)  => {

    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();
    const {mutate, isPending} = useJoinWorkspace();

    const onSubmit = () => {
        mutate({
            param: {workspaceId},
            json: {code: inviteCode}
        }, {
            onSuccess: ({data}) => {
                router.push(`/workspaces/${data.$id}`);
            },
        })
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Unirse al espacio de trabajo
                </CardTitle>
                <CardDescription>
                    Has sido invitado a unirte <strong>{initialValues.name}</strong>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
                    <Button
                        variant="destructive"
                        type="button"
                        asChild
                        size="lg"
                        className="w-full lg:w-fit"
                        disabled={isPending}
                    >
                        <Link href="/">
                        Cancelar
                        </Link>
                    </Button>
                    <Button
                        type="button"
                        size="lg"
                        onClick={onSubmit}
                        disabled={isPending}
                        className="w-full lg:w-fit"
                    >
                        Unirse al Area de trabajo
                    </Button>

                </div>

            </CardContent>
        </Card>
    )
} 