const{ createBook, getBooks, updateBook, deleteBook, getAllBooks }  = require('../../lib/neoCrud/book');

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { title, isbn, quantity } = req.body;
                const book = await createBook(title, isbn, quantity);
                res.status(201).json(book);
            } catch (error) {
                res.status(500).json({ error: "Error creating book" });
            }
            break;
        case 'GET':
            try {
                const { name, author, isbn, outOfStock, limit, skip } = req.query;
                if (name || author || isbn || outOfStock || limit || skip) {
                    const books = await getBooks({ 
                        name, 
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
                const { title, updates } = req.body;
                const book = await updateBook(title, updates);
                res.status(200).json(book);
            } catch (error) {
                res.status(500).json({ error: "Error updating book" });
            }
            break;
            case 'DELETE':
                try {
                    const { title } = req.query;
                    if (!title) {
                        res.status(400).json({ error: "Title parameter is required" });
                        return;
                    }
                    await deleteBook(title);
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
