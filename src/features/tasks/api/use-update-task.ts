import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType  } from "hono";
import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"], 200>
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType,Error,RequestType>({
        mutationFn: async ({json, param}) => {
            const response = await client.api.tasks[":taskId"]["$patch"]({json, param})

            if(!response.ok){
                throw new Error("Intento Fallido al actualizar la Tarea")
            }

            return await response.json()
        },
        onSuccess: ({data}) => {
            toast.success("Tarea actualizada")
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            queryClient.invalidateQueries({queryKey: ["task", data.$id]});

        },
        onError: () => {
            toast.error("Error al actualizar la Tarea")
        }
    });
    return mutation;
}