import { z } from "zod"

export const loginSchema = z.object({
    email:z.string().email(),
    password: z.string(),
})

export const registerSchema = z.object({
    name: z.string().trim().min(1, "Requerido"),
    email: z.string().email("Ingrese el Email"),
    password: z.string().min(8, "Minimo 8 Caracteres"),
})