import { useParams } from "next/navigation";

export const useInviteCode = () => {
    const params = useParams() // Obtiene los parámetros de la URL actual
    return params.inviteCode as string; // Devuelve 'inviteCode' como string
}