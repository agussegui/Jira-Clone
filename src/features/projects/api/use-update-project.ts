import { toast } from "sonner";
    import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType  } from "hono";
import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$patch"]>

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType,Error,RequestType>({
        mutationFn: async ({form, param}) => {
            const response = await client.api.projects[":projectId"]["$patch"]({form, param})

            if(!response.ok){
                throw new Error("Intento Fallido al actualizar el Proyecto")
            }

            return await response.json()
        },
        onSuccess: ({data}) => {
            toast.success("Proyecto actualizado")
            queryClient.invalidateQueries({queryKey: ["projects"]});
            queryClient.invalidateQueries({queryKey: ["project", data.$id]});

        },
        onError: () => {
            toast.error("Error al actualizar el proyecto")
        }
    });
    return mutation;
}