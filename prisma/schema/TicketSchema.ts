import {z} from "zod";

export const TicketSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, {message: "Nom requis"}),
    email: z.string().email({message: "Adresse email invalide"}),
    phoneNumber: z.string().min(10, {message: "Numéro de téléphone invalide"}),
    address: z.string().min(5, {message: "Adresse invalide"}),
    vatPayer: z.boolean(),
    materialType: z.string().min(2, {message: "Type de matériau requis"}),
    height: z.coerce.number().min(0.5, {message: "Hauteur minimum: 0,5m"}),
    length: z.coerce.number().min(0.5, {message: "Longueur minimum: 0,5m"}),
    area: z.number(),
    vatNumber: z.string().min(3, {message: "Numéro de TVA invalide"}),
    duration: z.coerce.number(),
    estimatedPrice: z.number(),
    sale: z.boolean(),
    creationDate: z.date().optional(),
});

export type TicketSchemaType = z.infer<typeof TicketSchema>;