const { getPageCount } = require('./author');

async function createBook(title, isbn, quantity) {
    try {
        const result = await session.run(
            'CREATE (b:Book {title: $title, isbn: $isbn, quantity: $quantity}) RETURN b',
            { title, isbn, quantity }
        );
        return result.records[0].get('b');
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
}

async function getBooks({ name, author, isbn, outOfStock, limit = 10, skip = 0 }) {
    try {
        let query = 'MATCH (b:Book)';
        let params = { limit, skip };

        if (author) {
            query += ' <-[:WROTE]- (a:Author {name: $author})';
            params.author = author;
        }

        if (name) {
            query += ' WHERE b.title CONTAINS $name';
            params.name = name;
        }

        if (isbn) {
            query += ' WHERE b.isbn = $isbn';
            params.isbn = isbn;
        }

        if (outOfStock) {
            query += ' WHERE b.quantity = 0';
        }

        query += ' RETURN b SKIP $skip LIMIT $limit';

        const result = await session.run(query, params);
        return result.records.map(record => record.get('b'));
    } catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
}

async function getBookPageCount({ name, author, isbn, outOfStock, limit = 10 }) {
    try {
        const books = await getBooks({ name, author, isbn, outOfStock, limit: Infinity });
        return getPageCount(books.length, limit);
    } catch (error) {
        console.error("Error getting book page count:", error);
        throw error;
    }
}

async function updateBook(title, updates) {
    try {
        const setString = Object.keys(updates).map(key => `b.${key} = $${key}`).join(', ');
        const params = { title, ...updates };

        const result = await session.run(
            `MATCH (b:Book {title: $title}) SET ${setString} RETURN b`,
            params
        );
        return result.records[0].get('b');
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}

async function deleteBook(title) {
    try {
        await session.run(
            `MATCH (b:Book {title: $title}) DETACH DELETE b`,
            { title }
        );
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
}

module.exports = { createBook, updateBook, deleteBook, getBooks, getBookPageCount };
