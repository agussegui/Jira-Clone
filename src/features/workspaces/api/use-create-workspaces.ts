import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType  } from "hono";
import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>

export const useCreateWorkspaces = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType,Error,RequestType>({
        mutationFn: async ({form}) => {
            const response = await client.api.workspaces["$post"]({form})

            if(!response.ok){
                throw new Error("Intento Fallido al crear Area de Trabajo")
            }

            return await response.json()
        },
        onSuccess: () => {
            toast.success("Area de Trabajo creada")
            queryClient.invalidateQueries({queryKey: ["workspaces"]});
        },
        onError: () => {
            toast.error("Error al crear Area de Trabajo")
        }
    });
    return mutation;
}