"use client"

import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Separator} from "@radix-ui/react-menu";
import {PdfModal} from "@/components/pdf-modal";
import {TicketSchemaType} from "@/prisma/schema/TicketSchema";

const Consult = ({ticket}: {ticket: TicketSchemaType}) => {

    if (ticket === undefined) return <div>Error when fetching, refresh the page</div>

    return (
        <Card className="m-auto md:w-[80%] w-[90%] mt-5">
            <CardHeader className="flex">
                <CardTitle>Devis de {ticket.name} - {ticket.sale ? "Vente" : "Location"} d'échafaudage</CardTitle>
                <CardDescription>Créé
                    le {ticket.creationDate === undefined ? "" : new Date(ticket.creationDate).toLocaleDateString("fr-be")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Label className="text-xl underline">Informations du client</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <Label>Nom</Label>
                        <p>{ticket.name}</p>
                    </div>
                    <div>
                        <Label>Téléphone</Label>
                        <p>{ticket.phoneNumber}</p>
                    </div>
                    <div>
                        <Label>Email</Label>
                        <p>{ticket.email}</p>
                    </div>
                    <div>
                        <Label>Adresse</Label>
                        <p>{ticket.address}</p>
                    </div>
                    <div>
                        <Label>Assujetti à la TVA</Label>
                        <p>{ticket.vatPayer ? "Oui" : "Non"}</p>
                    </div>
                    {ticket.vatPayer &&
                        <div>
                            <Label>Numéro de TVA</Label>
                            <p>{ticket.vatNumber}</p>
                        </div>}
                </div>
                <Label className="text-xl underline">Informations du devis</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {ticket.sale &&
                        <div>
                            <Label>Type de matériau</Label>
                            <p>{ticket.materialType}</p>
                        </div>}
                    <div>
                        <Label>Hauteur</Label>
                        <p>{ticket.height} m</p>
                    </div>
                    <div>
                        <Label>Longueur</Label>
                        <p>{ticket.length} m</p>
                    </div>
                    <div>
                        <Label>Surface</Label>
                        <p>{ticket.area} m²</p>
                    </div>
                    {!ticket.sale &&
                        <div>
                            <Label>Durée</Label>
                            <p>{ticket.duration} semaine(s)</p>
                        </div>}
                    {(!ticket.sale && ticket.area >= 70) &&
                        <div>
                            <Label>Prix estimé</Label>
                            <p>{ticket.estimatedPrice} €</p>
                        </div>}
                </div>
            </CardContent>
            <Separator className="w-16 h-[1px] m-6 bg-primary"/>
            <CardFooter className="flex md:flex-row flex-col items-start gap-5">
                <Button variant="outline" onClick={() => {
                    window.location.href = `mailto:${ticket.email}`;
                }}
                >Envoyer un email</Button>
                {(!ticket.sale && ticket.area >= 70) &&
                    <PdfModal ticket={ticket}>
                        <Button variant="outline">Prévisualiser en PDF</Button>
                    </PdfModal>}
            </CardFooter>
        </Card>
    );
};

export default Consult;