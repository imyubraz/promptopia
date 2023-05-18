import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// importing user model
import User from "@/models/user";

// importing db connection func
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

    async session({session}){
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString();

        return session;
    },
    async signIn({profile}){
        try {
            await connectToDB();

            // check if a user already exists
            const userExists = await User.findOne({
                email: profile.email
            })

            // if not, create a new user
            if(!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }
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


/* 
Check Next Auth documentation to learn more !!

*/