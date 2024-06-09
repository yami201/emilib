import { createAuthor, getAuthors, updateAuthor, deleteAuthor, getAuthorPageCount } from '../lib/neoCrud/author';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { name } = req.body;
                const author = await createAuthor(name);
                res.status(201).json(author);
            } catch (error) {
                res.status(500).json({ error: "Error creating author" });
            }
            break;
        case 'GET':
            try {
                const { name, bookTitle, limit, skip } = req.query;
                const authors = await getAuthors({ name, bookTitle, limit: parseInt(limit), skip: parseInt(skip) });
                res.status(200).json(authors);
            } catch (error) {
                res.status(500).json({ error: "Error getting authors" });
            }
            break;
        case 'PUT':
            try {
                const { name, updates } = req.body;
                const author = await updateAuthor(name, updates);
                res.status(200).json(author);
            } catch (error) {
                res.status(500).json({ error: "Error updating author" });
            }
            break;
        case 'DELETE':
            try {
                const { name } = req.body;
                await deleteAuthor(name);
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
