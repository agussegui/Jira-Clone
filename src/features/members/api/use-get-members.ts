import { useQuery } from "@tanstack/react-query";
import {client} from "@/lib/rpc";

interface UseGetMembersProps {
    workspaceId: string;
}

export const useGetMembers = ({workspaceId}: UseGetMembersProps) => {
    const query = useQuery({
        queryKey: ["members", workspaceId],
        queryFn: async () => {
            const response = await client.api.members.$get({query:{workspaceId}});

            if(!response.ok){
                throw new Error("No se pudieron obtener los Colaboradores")
            }

            const {data} = await response.json();
            return data;
        },
    });
    return query;
}