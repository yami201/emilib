const { session } = require('../neo4j');
const { createAuthor } = require('./author');
async function createAuthorIfNotExists(authorName, authorImage) {
    const result = await session.run(
        'MATCH (a:Author {name: $authorName}) RETURN a',
        { authorName }
    );

    if (result.records.length === 0) {
        const author = await createAuthor(authorName, authorImage);
        return author.properties.id;
    } else {
        return result.records[0].get('a').properties.id;
    }
}

async function createBook(title, isbn, initialQuantity, bookCover, authorName, authorImage) {
    try {
        const authorId = await createAuthorIfNotExists(authorName, authorImage);

        const bookResult = await session.run(
            'CREATE (b:Book {title: $title, isbn: $isbn, initialQuantity: $initialQuantity, currentQuantity: $initialQuantity, bookCover: $bookCover}) RETURN b',
            { title, isbn, initialQuantity, bookCover }
        );

        const book = bookResult.records[0].get('b');

        await session.run(
            'MATCH (a:Author {id: $authorId}), (b:Book {isbn: $isbn}) CREATE (a)-[:WROTE]->(b)',
            { authorId, isbn }
        );

        return book;
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
}

async function getBooks({ title, authorName, isbn, outOfStock, limit = 10, skip = 0 }) {
    try {
        let query = 'MATCH (b:Book)';
        let params = { limit, skip };

        if (authorName) {
            query += ' <-[:WROTE]- (a:Author {name: $authorName})';
            params.authorName = authorName;
        }

        if (title) {
            query += authorName ? ' AND' : ' WHERE';
            query += ' b.title CONTAINS $title';
            params.title = title;
        }

        if (isbn) {
            query += (authorName || title) ? ' AND' : ' WHERE';
            query += ' b.isbn = $isbn';
            params.isbn = isbn;
        }

        if (outOfStock) {
            query += (authorName || title || isbn) ? ' AND' : ' WHERE';
            query += ' b.currentQuantity = 0';
        }

        query += ' RETURN b SKIP $skip LIMIT $limit';

        const result = await session.run(query, params);
        return result.records.map(record => record.get('b'));
    } catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
}
async function getAllBooks() {
    try {
        const query = 'MATCH (b:Book) RETURN b';
        const result = await session.run(query);
        return result.records.map(record => record.get('b'));
    } catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
}

async function getBookPageCount({ title, authorName, isbn, outOfStock, limit = 10 }) {
    try {
        const books = await getBooks({ title, authorName, isbn, outOfStock, limit: Infinity });
        return getPageCount(books.length, limit);
    } catch (error) {
        console.error("Error getting book page count:", error);
        throw error;
    }
}

async function updateBook(isbn, updates) {
    try {
        const setString = Object.keys(updates).map(key => `b.${key} = $${key}`).join(', ');
        const params = { isbn, ...updates };

        const result = await session.run(
            `MATCH (b:Book {isbn: $isbn}) SET ${setString} RETURN b`,
            params
        );
        return result.records[0].get('b');
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}

async function deleteBook(isbn) {
    try {
        await session.run(
            `MATCH (b:Book {isbn: $isbn}) DETACH DELETE b`,
            { isbn }
        );
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
}

module.exports = { createBook, updateBook, deleteBook, getBooks, getBookPageCount, getAllBooks };
