import React from 'react';
import prisma from "@/lib/prisma";
import {notFound, redirect} from "next/navigation";
import PanelConsult from "@/components/panel-consult";
import {auth} from "@/lib/auth";

export default async function Consult({params}: { params: { id: string } }) {
    const session = await auth();

    if(session == null || session == undefined)
        redirect("/login")


    const ticket = await prisma.ticket.findUnique({
        where: {
            id: params.id
        }
    });

    if(!ticket) {
        notFound();
    }

    return (
        <PanelConsult ticket={ticket}/>
    );
}