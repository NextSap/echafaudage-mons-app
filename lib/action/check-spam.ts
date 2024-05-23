"use server"

import prisma from "@/lib/prisma";

export async function checkSpam(email: string, phone: string) {
    const ticket = await prisma.ticket.findMany({
        where: {
            OR: [
                {email: email},
                {phoneNumber: phone}
            ]
        },
        orderBy: {
            creationDate: "desc"
        },
    }).then(tickets => tickets[0]);

    if(!ticket) return false;

    return ticket.creationDate.getDate() < (Date.now() + 60000);
}