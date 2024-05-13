import {signOut} from "@/lib/auth";
import {Button} from "@/components/ui/button";

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut({redirect: true, redirectTo: "/login"})
            }}
        >
            <Button type="submit">Sign Out</Button>
        </form>
    )
}