import {z} from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(1, "Requerido"),
    image: z.union([
        z.instanceof(File),
        z.string().transform((value) => value === "" ? undefined : value),
    ])
    .optional(),
    workspaceId:z.string()
})

export const updateProjectSchema = z.object({
    name: z.string().min(1, "Minimo 1 Caracter requerido").optional(),
    image: z.union([
        z.instanceof(File),
        z.string().transform((value) => value === "" ? undefined : value),
    ])
    .optional(),
})