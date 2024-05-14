import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"
import {Provider} from "@auth/core/providers";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

const authorizedEmails = process.env.AUTHORIZED_EMAILS ? process.env.AUTHORIZED_EMAILS.split(";") : [];

const providers: Provider[] = [
    Nodemailer({
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        },
        from: process.env.EMAIL_FROM,
    }),
];

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider()
        return {id: providerData.id, name: providerData.name}
    } else {
        return {id: provider.id, name: provider.name}
    }
})

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: providers,
    callbacks: {
        signIn({ user }) {
            return authorizedEmails.includes(String(user.email));
        }
    },
})