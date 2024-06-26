"use client"

import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod";
import {Slider} from "@/components/ui/slider";
import {Checkbox} from "@/components/ui/checkbox";
import {Card} from "@/components/ui/card";
import React, {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {TicketFormSchema, TicketFormSchemaType, TicketSchemaType} from "@/prisma/schema/TicketSchema";
import {createTicket} from "@/lib/action/create-ticket";
import Image from "next/image";
import {ChevronLeft} from "lucide-react";

export default function Home() {
    const {toast} = useToast();
    const form = useForm<TicketFormSchemaType>({
        resolver: zodResolver(TicketFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            vatPayer: false,
            materialType: "N/A",
            height: 0,
            length: 0,
            area: 0,
            vatNumber: "",
            duration: 0,
            estimatedPrice: 0,
            sale: false,
            city: "",
            postalCode: "",
        },
    });

    function sendPublicEmail(values: TicketSchemaType) {
        fetch("/api/send/public", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((response) => console.log(response))
            .catch((error) => console.error(error));
    }

    function sendPrivateEmail() {
        fetch("/api/send/private", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => console.log(response))
            .catch((error) => console.error(error));
    }

    function onSubmit(values: TicketFormSchemaType) {
        const squareMeterPrice = 10;

        values.estimatedPrice = (values.area >= 75 && !values.sale) ? (values.area * squareMeterPrice) : -1;

        // convert values to TicketSchemaType
        const ticketValues: TicketSchemaType = {
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            address: values.address + " " + values.postalCode + " " + values.city,
            vatPayer: values.vatPayer,
            materialType: values.materialType,
            height: values.height,
            length: values.length,
            area: values.area,
            vatNumber: values.vatNumber,
            duration: values.duration,
            estimatedPrice: values.estimatedPrice,
            sale: values.sale,
        };

        createTicket(ticketValues)
            .then(() => {
               sendPrivateEmail();

                if(values.area >= 75 && !values.sale)
                   sendPublicEmail(values);

                toast({
                    title: "Demande de devis envoyée",
                    description: "Votre demande de devis a été envoyée avec succès",
                });
            }).catch((error) => {
            if(error.toString().includes("SPAM")) {
                toast({
                    variant: "destructive",
                    title: "Erreur",
                    description: "Vous avez déjà envoyé une demande de devis.",
                });
                return;
            }

            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Une erreur est survenue lors de l'envoi de votre demande de devis",
            });
        });
    }

    const [vatPayer, setVatPayer] = useState(false);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col p-3 items-start">
                <Button variant="ghost"><a href={"https://www.echafaudage-mons.be/"}
                                           className="flex gap-0.5 items-center"><ChevronLeft/>Retour au
                    site</a></Button>
                <Image src={"/Logo.jpeg"} alt={"Logo"} width={150} height={100} className="m-auto"/>
                <h1 className="m-auto mt-3 text-xl">Location d'échafaudage</h1>
            </div>
            <Card className="w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className="flex flex-col gap-5 md:w-[80%] w-[95%] m-auto p-5">
                            <div className="flex flex-col justify-around gap-5 md:gap-10 md:flex-row">
                                <div className="flex flex-col gap-5 w-full">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nom" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Numéro de téléphone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Numéro de téléphone" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Adresse</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Adresse" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                    <FormField
                                        control={form.control}
                                        name="postalCode"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Code postal</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Code postal" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Ville</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ville" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                </div>
                                <div className="flex flex-col gap-5 w-full">
                                    <FormField
                                        control={form.control}
                                        name="height"
                                        render={({field: {value, onChange}}) => (
                                            <FormItem>
                                                <FormLabel>Hauteur - {value}m</FormLabel>
                                                <FormControl>
                                                    <Input type={"number"} min={"0"} onChange={onChange} step={0.5}
                                                           placeholder="Hauteur"/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                    <FormField
                                        control={form.control}
                                        name="length"
                                        render={({field: {value, onChange}}) => (
                                            <FormItem>
                                                <FormLabel>Longueur - {value}m</FormLabel>
                                                <FormControl>
                                                    <Input type={"number"} min={"0"} onChange={onChange} step={0.5}
                                                           placeholder="Longueur"/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                    <FormField
                                        control={form.control}
                                        name="area"
                                        render={({field: {value, onChange}}) => (
                                            <FormItem>
                                                <FormLabel>Superficie - {value}m²</FormLabel>
                                                <FormControl>
                                                    <Slider defaultValue={Array.of(value)}
                                                            onValueChange={(e) => onChange(e[0])} step={1} min={0}
                                                            max={200}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                        <FormField
                                            control={form.control}
                                            name="duration"
                                            render={({field: {value, onChange}}) => (
                                                <FormItem className="md:mt-[32px]">
                                                    <FormLabel>Durée - {value} semaine{value > 1 ? "s" : ""}</FormLabel>
                                                    <FormControl>
                                                        <Input type={"number"} min={"1"} defaultValue={value}
                                                               onChange={onChange}
                                                               step={1} placeholder="Durée"/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="vatPayer"
                                render={({field: {value, onChange}}) => (
                                    <FormItem>
                                        <div className="flex items-center gap-2">
                                            <FormControl>
                                                <Checkbox checked={value} onCheckedChange={(e) => {
                                                    onChange(e);
                                                    setVatPayer(!value);
                                                }} id={"vat"}/>
                                            </FormControl>
                                            <FormLabel htmlFor={"vat"}>Assujetti à la TVA</FormLabel>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            {vatPayer &&
                                <FormField
                                    control={form.control}
                                    name="vatNumber"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Numéro de TVA</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Numéro de TVA" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>}
                            <Button type="submit" onClick={() => {
                                if (!form.getValues("vatPayer")) form.setValue("vatNumber", "N/A");
                            }}>Demander un devis gratuit</Button>
                        </form>
                    </Form>
                </Card>
        </div>
    );
}
