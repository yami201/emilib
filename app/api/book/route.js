import { getBooks, createFullBook, deleteBook } from "@/lib/mongo/db/books";
import { getAuthorsOfBook, createBook, deleteBookEntity } from "@/lib/neo4j/db/books";

export async function GET() {
    try {
        const data = await getBooks();
    
        const books = await Promise.all(
            data.map(async (book) => {
                const authors = await getAuthorsOfBook(book.isbn)
                
                return {
                    ...book,
                    authors
                }
            })
        )

        return new Response(JSON.stringify(books), {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        return new Response(JSON.stringify({ message:`Error: ${error.message}`}), {
            status: 400,
        })
    }
}
export async function POST(request) {
    try {
        const body = await request.json()
        await createBook(body);
        await createFullBook(body);

        return new Response(JSON.stringify({message:'Success'}), {status:201})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message:`Error: ${error.message}`}), {
            status: 400,
        })
    }
}

export async function DELETE(request) {
    try {
        const {searchParams} = new URL(request.url)
        const isbn = searchParams.get('isbn')

        await deleteBook(isbn)
        await deleteBookEntity(isbn)

        return new Response("deleted", {status: 204})
    } catch (error) {
        return new Response(JSON.stringify({ message:`Error: ${error.message}`}), {
            status: 400,
        })
    }
}