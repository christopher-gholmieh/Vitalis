// Written by: Christopher Gholmieh
// Imports:

// Authentication:
import {
    // Session:
    getServerSession as get_server_session
} from "next-auth";

// Configuration:
import authentication_options from "@/app/api/auth/[...nextauth]/configuration";

// Navigation:
import { redirect } from "next/navigation";

// Providers:
import { Provider } from "@/app/providers";

// React:
import { ReactNode } from "react";


// Protection:
const protection = async () => {
    // Variables (Assignment):
    // Session:
    const session = await get_server_session(authentication_options);

    // Logic:
    if (!session) { return; }

    redirect("/dashboard");
}


// Layout:
const Layout = async ({
    children
}: Readonly<{ children: ReactNode }>) => {
    // Protection:
    await protection();

    // Layout:
    return (
        <Provider>
            {children}
        </Provider>
    )
}

// Exports:
export default Layout;