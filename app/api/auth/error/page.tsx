"use client"

import { useSearchParams } from "next/navigation"
import {Card, CardContent, CardHeader} from "@/components/ui/card";

enum Error {
    Configuration = "Configuration",
    AccessDenied = "AccessDenied",
    Default= "Default",
}

const errorMap = {
    [Error.Configuration]: (
        <p>
            There was a problem when trying to authenticate. Please contact us if this
            error persists. Unique error code:{"500"}
            <code className="text-xs bg-slate-100 p-1 rounded-sm">Configuration</code>
        </p>
    ),
    [Error.AccessDenied]: (
        <p>
            Access was denied. You may not have the necessary permissions to access this
            code:{" "}
            <code className="text-xs bg-slate-100 p-1 rounded-sm">AccessDenied</code>
        </p>
    ),
    [Error.Default]: (
        <p>
            There was a problem when trying to authenticate. Please contact us if this
            error persists. Unique error code:{" "}
            <code className="text-xs bg-slate-100 p-1 rounded-sm">Default</code>
        </p>
    ),
}

export default function AuthErrorPage() {
    const search = useSearchParams()
    const error = search.get("error") as Error

    return (
        <div className="w-full h-screen flex justify-center items-center">

        <Card className="w-[40%]">
            <CardHeader>
                <h1>{error}</h1>
            </CardHeader>
            <CardContent>
                {errorMap[error] || errorMap[Error.Default]}
            </CardContent>
        </Card>
        </div>
    )
}