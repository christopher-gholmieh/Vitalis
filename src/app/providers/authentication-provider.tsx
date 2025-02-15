// Written by: Christopher Gholmieh
// Client:
"use client"

// Imports:

// Authentication:
import { SessionProvider } from "next-auth/react";

// React:
import { ReactNode } from "react";


// Provider:
const Provider = ({
    children
}: Readonly<{ children: ReactNode }>) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

// Exports:
export default Provider;