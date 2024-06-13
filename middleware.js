import { cookies } from "next/headers";
import { createSessionClient } from "./lib/appwrite";
import { getLoggedInUser } from "./lib/actions/user.actions";
import { NextResponse } from "next/server";

// Adjust the path accordingly

export async function middleware(req) {
    const url = req.nextUrl.clone()
    try {
        const loggedInUser = await getLoggedInUser();
        if (loggedInUser) {
            const res = NextResponse.next();
            res.headers.set("user", JSON.stringify(loggedInUser));

            if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
                
                url.pathname = "/"
                return NextResponse.redirect(url);
            }
            return res;
        }
        if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
            return NextResponse.next()
        }
        url.pathname = "/sign-in"
        return NextResponse.redirect(url)
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};