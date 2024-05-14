"use server"

import prisma from "@/lib/prisma";
import {TicketSchemaType} from "@/prisma/schema/TicketSchema";
import {checkSpam} from "@/lib/action/check-spam";

export async function createTicket(values: TicketSchemaType) {
    try {
        const isSpam = await checkSpam(values.email, values.phoneNumber);
        if (isSpam)
            throw new Error("SPAM");

        return prisma.ticket.create({
            data: values
        });
    } catch (error) {
        throw error;
    }
}