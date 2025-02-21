import {z} from "zod";

export const createWorkspacesSchema = z.object({
    name: z.string().min(1, "Requerido"),
    image: z.union([
        z.instanceof(File),
        z.string().transform((value) => value === "" ? undefined : value),
    ])
    .optional()
})

export const updateWorkspaceSchema = z.object({
    name: z.string().trim().min(2, "Debe tener 1 o más caracteres").optional(),
    image: z.union([
        z.instanceof(File),
        z.string().transform((value) => value === "" ? undefined : value),
    ])
    .optional(),
})