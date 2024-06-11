import { createAuthor, getAuthors, updateAuthor, deleteAuthor, getAllAuthors } from '../../lib/neoCrud/author';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { name, image } = req.body;
                const author = await createAuthor(name, image);
                res.status(201).json(author);
            } catch (error) {
                res.status(500).json({ error: "Error creating author" });
            }
            break;

        case 'GET':
            try {
                const { name, bookTitle, limit = 10, skip = 0 } = req.query;
                if (name || bookTitle) {
                    const authors = await getAuthors({
                        name,
                        bookTitle,
                        limit: parseInt(limit, 10),
                        skip: parseInt(skip, 10)
                    });
                    res.status(200).json(authors);
                } else {
                    const authors = await getAllAuthors();
                    res.status(200).json(authors);
                }
            } catch (error) {
                res.status(500).json({ error: "Error getting authors" });
            }
            break;

        case 'PUT':
            try {
                const { id, updates } = req.body;
                const author = await updateAuthor(id, updates);
                res.status(200).json(author);
            } catch (error) {
                res.status(500).json({ error: "Error updating author" });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.body;
                await deleteAuthor(id);
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "Error deleting author" });
            }
            break;

        default:
            res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
