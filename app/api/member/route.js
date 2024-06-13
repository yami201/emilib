import {createMember, findMembersByQuery, getMembers, updateMember} from "@/lib/mongo/db/members";

export async function GET(request) {
    let members = await getMembers();

    const {searchParams} = new URL(request.url);
    const query = {};

    // Loop through all query parameters and add them to an object
    searchParams.forEach((value, key) => {
        query[key] = value;
    });

    if (query) {
        members = await findMembersByQuery(query);
    } else {
        members = await getMembers();
    }

    return new Response(JSON.stringify(members), {status: 200, headers: {'Content-Type': 'application/json'}});
}

export async function POST(request) {
    try {
        const body = await request.json();
       const member = await createMember(body)
        return new Response(JSON.stringify(member), {
            status: 201
        })
    } catch (error) {
        return new Response(JSON.stringify({ message:`Error: ${error.message}`}), {
            status: 400,
        })
    }
}

export async function PUT(request) {
    try {
        const {searchParams} = new URL(request.url);
        const query = {};

        searchParams.forEach((value, key) => {
            query[key] = value;
        });

        const body = await request.json();

        await updateMember(query, body)
        return new Response("message : member updated", {status: 202, headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return new Response(`error: ${error.message}`, {
            status: 400,
        })
    }
}