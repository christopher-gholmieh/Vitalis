// Written by: Christopher Gholmieh
// Client:
"use client"

// Imports:

// Authentication:
import {
    signIn as sign_in,
} from "next-auth/react";

// Navigation:
import {
    useRouter as use_router
} from "next/navigation";

// Components:
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
  

// React:
import {
    useState as use_state
} from "react";


// Page:
const Page = () => {
    // Variables (Assignment):
    // Username:
    const [ username, set_username ] = use_state("");

    // Password:
    const [ password, set_password ] = use_state("");

    // Alert:
    const [ show_alert, set_show_alert ] = use_state(false);

    // Router:
    const router = use_router();

    // Methods:
    const authenticate = async (event) => {
        // Event:
        event.preventDefault();

        // Logic:
        const result = await sign_in("credentials", {
            /* Redirect: */
            redirect: false,

            /* Username: */
            username: username,

            /* Password: */
            password: password,
        });

        if (!result || !result.error) {
            router.push("/dashboard");
        } else {
            set_show_alert(true);
        }
    }


    // Logic:
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <Card className="w-full max-w-md">
                {/* Header: */}
                <CardHeader className="space-y-2">
                    {/* Title: */}
                    <CardTitle className="text-3xl font-semibold font-[Poppins]">
                        Sign in
                    </CardTitle>

                    <p className="text-sm text-gray-500 font-[Poppins]">
                        Easily manage with Vitalis
                    </p>
                </CardHeader>

                {/* Content: */}
                <CardContent>
                    <form className="space-y-4" onSubmit={authenticate}>
                        {/* Username: */}
                        <Input
                            placeholder="Username"
                            type="text"
                            className="h-12 font-[Poppins]"
                            name="username"
                            id="username"
                            required
                            onChange={(event) => {
                                set_username(event.currentTarget.value)
                            }}
                        />

                        {/* Password: */}
                        <Input
                            placeholder="Password"
                            type="password"
                            className="h-12 font-[Poppins]"
                            name="password"
                            id="password"
                            required
                            onChange={(event) => {
                                set_password(event.currentTarget.value)
                            }}
                        />

                        {/* Button: */}
                        <Button type="submit" className="w-full h-12 bg-[#0A66C2] hover:bg-[#084d92] text-md font-[Poppins]">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Alert: */}
            <AlertDialog open={show_alert} onOpenChange={set_show_alert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Unauthorized access!
                        </AlertDialogTitle>

                        <AlertDialogHeader>
                            <AlertDialogDescription>
                                All unauthorized access attempts will be logged, reported, and investigated.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="">Okay</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

// Exports:
export default Page;