import React from 'react';
import {SignIn} from "@/components/sign-in";


export default async function Page() {
    return (
        <div className="flex flex-col gap-2">
            <SignIn/>
        </div>
    )
}