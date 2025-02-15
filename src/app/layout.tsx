// Written by: Christopher Gholmieh
// Imports:

// Next:
import { type Metadata } from "next";

// React:
import { ReactNode } from "react";

// CSS:
import "./index.css";


// Metadata:
export const metadata: Metadata = {
    /* Title: */
    title: "Vitalis",

    /* Description: */
    description: "An application to assist hospitals with tracking patients."
} satisfies Metadata;


// Layout:
const Layout = ({
    children
}: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    )
}

// Exports:
export default Layout;