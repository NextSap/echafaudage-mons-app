import {z} from "zod";

export const LoginSchema = z.object({
    email: z.string().email({message: "Email invalide"}),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;