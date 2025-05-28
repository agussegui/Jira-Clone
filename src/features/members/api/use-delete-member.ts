import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType  } from "hono";
import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$delete"], 200>
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$delete"]>

export const useDeleteMembers = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType,Error,RequestType>({
        mutationFn: async ({param}) => {
            const response = await client.api.members[":memberId"]["$delete"]({param})

            if(!response.ok){
                throw new Error("Intento Fallido al eliminar al Colaborador")
            }

            return await response.json()
        },
        onSuccess: () => {
            toast.success("Colaborador eliminado")
            queryClient.invalidateQueries({queryKey: ["members"]});

        },
        onError: () => {
            toast.error("Error al eliminar al Colaborador")
        }
    });
    return mutation;
}