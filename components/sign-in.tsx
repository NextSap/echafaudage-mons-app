import {signIn} from "@/lib/auth";
import {Button} from "@/components/ui/button";

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("email", {redirect: true, redirectUrl: "/panel"})
            }}
        >
            <Button type="submit">Sign In</Button>
        </form>
    )
}