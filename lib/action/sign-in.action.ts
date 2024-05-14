"use server"

import {signIn} from "@/lib/auth";

export async function signInAction(email: string, redirectTo?: string) {
    await signIn("email", {email: email, redirect: true, redirectTo: redirectTo});
}