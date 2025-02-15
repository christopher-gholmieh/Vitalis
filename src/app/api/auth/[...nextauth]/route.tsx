// Written by: Christopher Gholmieh
// Imports:

// Authentication:
import NextAuth from "next-auth";

// Configuration:
import authentication_options from "@/app/api/auth/[...nextauth]/configuration";


// Handler:
const handler = NextAuth(authentication_options);

// Exports:
export { handler as POST, handler as GET };