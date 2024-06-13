import { NextResponse } from 'next/server';

export function middleware(request) {
    const loggedIn = false;
    const url = request.nextUrl.clone()
    if(url.pathname === '/loans') {
        return NextResponse.next()
    }



    if(loggedIn) {
        url.pathname = '/loans'
        return NextResponse.redirect(url)
    } else {
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
