"use client"

import React from 'react';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {LoginSchema, LoginSchemaType} from "@/prisma/schema/LoginSchema";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signInAction} from "@/lib/action/sign-in.action";

const Page = () => {

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: LoginSchemaType) {
        await signInAction(data.email, "/panel");
    }

    return (
        <Card className="md:w-[60%] w-[95%] m-auto mt-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Connexion au panel admin</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">

                        <FormField control={form.control}
                                   name={"email"}
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel>Email</FormLabel>
                                           <FormControl>
                                               <Input placeholder={"Email"} {...field}/>
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}/>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Connexion</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default Page;