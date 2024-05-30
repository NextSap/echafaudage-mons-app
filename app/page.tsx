"use client";

import React from 'react';
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import Image from "next/image";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter();

    return (
        <div>
            <Button variant="ghost"><a href={"https://www.echafaudage-mons.be/"}
                                       className="flex gap-0.5 items-center"><ChevronLeft/>Retour au
                site</a></Button>
            <Image src={"/Logo.jpeg"} alt={"Logo"} width={150} height={100} className="m-auto"/>
            <div className="w-screen flex flex-col gap-10 justify-center items-center pt-20">
                <Button onClick={() => router.push("/sale")}>Vente d'échafaudage</Button>
                <Button onClick={() => router.push("/rent")}>Location d'échafaudage</Button>
            </div>
        </div>
    );
};

export default Page;