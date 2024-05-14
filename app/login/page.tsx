import React from 'react';
import {SignIn} from "@/components/sign-in";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";


export default async function Page() {
    const session = await auth();

    if (session !== null)
        redirect("/panel", RedirectType.push)

    return (
        <div className="flex flex-col gap-2">
            <SignIn/>
        </div>
    )
};