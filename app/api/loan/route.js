import {createLoan, findLoansByQuery, getLoans, updateLoan} from "@/lib/loanDb";

export async function GET(request) {
    let loans;
    const {searchParams} = new URL(request.url);
    const query = {};

    searchParams.forEach((value, key) => {
        query[key] = value;
    });

    if (query) {
        loans = await findLoansByQuery(query);
    } else {
        loans = await getLoans();
    }

    return new Response(JSON.stringify(loans), {status: 200, headers: {'Content-Type': 'application/json'}});
}

export async function POST(request) {
    try {
        const body = await request.json();
        let loan = await createLoan(body)
        return new Response("loan created", {status: 201})
    } catch (error) {
        return new Response(`error: ${error.message}`, {
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

        await updateLoan(query, body)
        return new Response("message : loan updated", {status: 202, headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return new Response(`error: ${error.message}`, {
            status: 400,
        })
    }
}