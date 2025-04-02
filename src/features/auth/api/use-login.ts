import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType  } from "hono";
import {client} from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>

export const useLogin = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType,Error,RequestType>({
        mutationFn: async ({json}) => {
            const response = await client.api.auth.login["$post"]({json})
            if(!response.ok){
                throw new Error("Intento Fallido al Iniciar Sesión")
            }
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Sesión Iniciada")
            router.refresh();
            queryClient.invalidateQueries({queryKey: ["current"]})
        },
        onError: () => {
            toast.error("Intento Fallido al Iniciar Sesión")
        }
    });
    return mutation
}