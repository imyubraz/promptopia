import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@/config/database";

/* 
console.log(
    {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
);
 */

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    async sessionStorage({session}){

    },
    async signIn({profile}){
        try {
            await connectToDB();

            // check if a user already exists

            // if not, create a new user

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
})


/* 
Info :
Every Next.js route is a serverless route
which means its a lamda function that opens up only when it gets called
Everytime it get called its spin up the server and make a connection

to make a connection we make db config in config/database.js
 */