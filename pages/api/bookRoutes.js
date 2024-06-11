const { createBook, getBooks, updateBook, deleteBook, getAllBooks }  = require('../../lib/neoCrud/book');

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { title, isbn, initialQuantity, bookCover, authorName, authorImage } = req.body;
                const book = await createBook(title, isbn, initialQuantity, bookCover, authorName, authorImage);
                res.status(201).json(book);
            } catch (error) {
                res.status(500).json({ error: "Error creating book" });
            }
            break;

        case 'GET':
            try {
                const { title, author, isbn, outOfStock, limit = 10, skip = 0 } = req.query;
                if (title || author || isbn || outOfStock) {
                    const books = await getBooks({ 
                        title, 
                        author, 
                        isbn, 
                        outOfStock: outOfStock === 'true', 
                        limit: parseInt(limit), 
                        skip: parseInt(skip) 
                    });
                    res.status(200).json(books);
                } else {
                    const books = await getAllBooks();
                    res.status(200).json(books);
                }
            } catch (error) {
                res.status(500).json({ error: "Error getting books" });
            }
            break;

        case 'PUT':
            try {
                const { isbn, updates } = req.body;
                const book = await updateBook(isbn, updates);
                res.status(200).json(book);
            } catch (error) {
                res.status(500).json({ error: "Error updating book" });
            }
            break;

        case 'DELETE':
            try {
                const { isbn } = req.query;
                if (!isbn) {
                    res.status(400).json({ error: "ISBN parameter is required" });
                    return;
                }
                await deleteBook(isbn);
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "Error deleting book" });
            }
            break;

        default:
            res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
