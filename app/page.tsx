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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card} from "@/components/ui/card";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {TicketSchema, TicketSchemaType} from "@/prisma/schema/TicketSchema";
import {createTicket} from "@/lib/action/create-ticket";
import {checkSpam} from "@/lib/action/check-spam";

export default function Home() {
    const {toast} = useToast();
    const form = useForm<TicketSchemaType>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            vatPayer: false,
            materialType: "",
            height: 0,
            length: 0,
            area: 0,
            vatNumber: "",
            duration: 0,
            estimatedPrice: 0,
            sale: true,
        },
    });

    function sendEmail() {

    }

    function onSubmit(values: TicketSchemaType) {
        const squareMeterPrice = 10;

        values.estimatedPrice = values.area >= 70 && !values.sale ? values.area * squareMeterPrice : -1;

        createTicket(values)
            .then(() => {
                if(values.area >= 70)
                    sendEmail();

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
                title: "Erreur",
                description: "Une erreur est survenue lors de l'envoi de votre demande de devis",
            });
        });
    }

    const [vatPayer, setVatPayer] = useState(false);
    const [sale, setSale] = useState(true);

    return (
        <Tabs defaultValue="sale" onValueChange={() => {
            if (form.getValues("duration") < 1) form.setValue("duration", 1);
            setSale(!sale);
        }}
              className="flex flex-col items-center md:w-[80%] w-[95%] gap-5 pt-10 m-auto">
            <TabsList className="w-full">
                <TabsTrigger value="sale" className="w-full">Vente</TabsTrigger>
                <TabsTrigger value="rent" className="w-full">Location</TabsTrigger>
            </TabsList>
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
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                {sale &&
                                    <FormField
                                        control={form.control}
                                        name="materialType"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Type d'échafaudage</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Type d'échafaudage"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem
                                                                value="Multidirectionnel">Multidirectionnel</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>}
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
                                                <Slider defaultValue={Array.of(value)} onValueChange={(e) => onChange(e[0])} step={1} min={0}
                                                        max={100}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                {!sale &&
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
                                        )}/>}
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
                            if (sale) form.setValue("duration", -1);
                            if (!form.getValues("vatPayer")) form.setValue("vatNumber", "N/A");
                            if (!sale) form.setValue("materialType", "N/A");
                            form.setValue("sale", sale);
                        }}>Demander un devis gratuit</Button>
                    </form>
                </Form>
            </Card>
        </Tabs>
    )
}
