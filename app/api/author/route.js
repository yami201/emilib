
import { createAuthor, deleteAuthor, getAuthors } from "@/lib/neo4j/db/author";

export async function GET() {
    try {
        const data = await getAuthors();
        return new Response(JSON.stringify(data), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({ message:`Error: ${error.message}`}), {
            status: 400,
        })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        await createAuthor(body)

        return new Response(JSON.stringify({message: 'success'}), {status: 201})
    } catch (error) {
        return new Response(JSON.stringify({ message:`Error: ${error.message}`}), {
            status: 400,
        })
    }
}

export async function DELETE(request) {
    try {
        const {searchParams} = new URL(request.URL)
        const id = searchParams.get("id")
        await deleteAuthor(id)
        return new Response(JSON.stringify({message: 'success'}), {status: 204})
    } catch (error) {
        return new Response(JSON.stringify({ message:`Error: ${error.message}`}), {
            status: 400,
        })
    }
}