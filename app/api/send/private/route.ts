import {NextResponse} from "next/server";
import nodemailer from 'nodemailer';

export async function POST() {
    try {
        const {EMAIL_SERVER_HOST, EMAIL_FROM, EMAIL_SERVER_PASSWORD, CC_EMAIL} = process.env;

        if (!EMAIL_SERVER_HOST || !EMAIL_FROM || !CC_EMAIL)
            throw new Error("Problem with env variables");


        const transporter = nodemailer.createTransport({
            host: EMAIL_SERVER_HOST,
            port: 465,
            service: "gmail",
            secure: true,
            auth: {
                user: EMAIL_FROM,
                pass: EMAIL_SERVER_PASSWORD,
            },
        })

        const mailOption = {
            from: EMAIL_FROM,
            to: CC_EMAIL,
            subject: "Demande de devis - Echafaudage Mons",
            html: emailToMarkdown(),
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({message: "Email Sent Successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error when sending email"}, {status: 500})
    }
}

function emailToMarkdown() {
    return `
    Bonjour,<br/>
    <br/>
    Une demande de devis a été effectuée sur le site Echafaudage Mons.<br/>
    <br/>
    Connexion au panel via https://echafaudage-mons-devis.online/login<br/>    
`
}