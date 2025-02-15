// Written by: Christopher Gholmieh
// Imports:

// Authentication:
import authentication_options from "@/app/api/auth/[...nextauth]/configuration";

import {
    getServerSession as get_server_session
} from "next-auth";

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
    if (session) { return null; }

    redirect("/authentication");
}


// Layout:
const Layout = async ({
    children
}: Readonly<{ children: ReactNode }>) => {
    await protection();

    return (
        <Provider>
            {children}
        </Provider>
    )
}

// Exports:
export default Layout;