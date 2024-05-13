import React from 'react';
import {auth} from "@/lib/auth";
import {SignIn} from "@/components/sign-in";
import {SignOut} from "@/components/sign-out";

export default async function Panel() {
    const session = await auth();

    if(session == null) {
        return (
            <div className="flex flex-col gap-2">
                Not authenticated
                <SignIn/>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <h1>Panel</h1>
            <p>Welcome {session?.user?.email}</p>
            <SignOut/>
        </div>
    )
}