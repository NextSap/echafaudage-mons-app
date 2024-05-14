import React from 'react';
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import PanelPage from "@/components/panel-page";
import prisma from "@/lib/prisma";

export default async function Panel() {
    const session = await auth();

    if(session == null || session == undefined)
        redirect("/login")

    const totalPages = await prisma.ticket.count().then((count) => {
        return Math.ceil(count / 10 + 1);
    });

    const tickets = await prisma.ticket.findMany({
        orderBy: {
            creationDate: 'desc'
        }
    });

    if(tickets == null || tickets == undefined || totalPages == null || totalPages == undefined)
        return <div>Loading...</div>

    return (
        <PanelPage tickets={tickets} totalPages={totalPages}/>
    )
}