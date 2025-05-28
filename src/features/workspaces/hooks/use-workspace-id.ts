import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
    const params = useParams() // Obtiene los parámetros de la URL actual en Next.js
    return params.workspaceId as string; // Devuelve el parámetro 'workspaceId' tipado como string
}