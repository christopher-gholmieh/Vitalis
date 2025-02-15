// Written by: Christopher Gholmieh
// Imports:

// Authentication:
import { AuthOptions } from "next-auth";

// Providers:
import CredentialsProvider from "next-auth/providers/credentials";


// Authentication:
const authentication_options: AuthOptions = {
    /* Providers: */
    providers: [
        CredentialsProvider({
            /* Name: */
            name: "Credentials",

            /* Credentials: */
            credentials: {
                /* Username: */
                username: { label: "Username", type: "text", placeholder: "Username"},

                /* Password: */
                password: { label: "Password", type: "password", placeholder: "Password"},
            },

            /* Authorize: */
            async authorize(credentials, request) {
                // Validation:
                if (!credentials?.username || !credentials?.password) { return null; }

                /**
                 * NOTE: Never perform this practice in actual production..
                 *  - Christopher Gholmieh
                 */
                if (credentials.username === "admin" && credentials.password === "password") {
                    return { id: "1", name: "John Doe", email: "john.doe@gmail.com" }
                }

                return null;
            }
        })
    ],

    /* Callbacks: */
    callbacks: {
        /* Session: */
        async session({ session, token }) {
            // Identification:
            session.user = { ...session.user, id: token.id } as any;

            // Logic:
            return session;
        },

        /* JWT: */
        async jwt({ token, user, account }) {
            // Logic:
            if (user) {
                // Identification:
                token.id = user.id;
            }

            return token;
        },
    },

    /* Session: */
    session: {
        /* Strategy: */
        strategy: "jwt"
    },

    /* Secret: */
    secret: process.env.NEXTAUTH_SECRET,

    /* Pages: */
    pages: {
        signIn: "/authentication"
    },
} satisfies AuthOptions;

// Exports:
export default authentication_options;