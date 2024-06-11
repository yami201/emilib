const { session } = require('../neo4j');
const { v4: uuidv4 } = require('uuid');

async function createAuthor(name, image) {
  try {
      const id = uuidv4();
      const result = await session.run(
          'CREATE (a:Author {id: $id, name: $name, image: $image}) RETURN a',
          { id, name, image }
      );
      return result.records[0].get('a');
  } catch (error) {
      console.error("Error creating author:", error);
      throw error;
  }
}

async function getAllAuthors() {
    try {
        const query = 'MATCH (a:Author) RETURN a';
        const result = await session.run(query);
        return result.records.map(record => record.get('a'));
    } catch (error) {
        console.error("Error getting authors:", error);
        throw error;
    }
}

async function getAuthors({ name, bookTitle, limit = 10, skip = 0 }) {
    try {
        limit = parseInt(limit, 10);
        skip = parseInt(skip, 10);

        let query = 'MATCH (a:Author)';
        let params = { limit, skip };

        if (name) {
            query += ' WHERE a.name CONTAINS $name';
            params.name = name;
        }

        if (bookTitle) {
            query += ' -[:WROTE]-> (b:Book {title: $bookTitle})';
            params.bookTitle = bookTitle;
        }

        query += ' RETURN a SKIP $skip LIMIT $limit';

        const result = await session.run(query, params);
        return result.records.map(record => record.get('a'));
    } catch (error) {
        console.error("Error getting authors:", error);
        throw error;
    }
}

async function updateAuthor(id, updates) {
  try {
      const setString = Object.keys(updates).map(key => `a.${key} = $${key}`).join(', ');
      const params = { id, ...updates };

      const result = await session.run(
          `MATCH (a:Author {id: $id}) SET ${setString} RETURN a`,
          params
      );
      return result.records[0].get('a');
  } catch (error) {
      console.error("Error updating author:", error);
      throw error;
  }
}

async function deleteAuthor(id) {
  try {
      await session.run(
          `MATCH (a:Author {id: $id}) DETACH DELETE a`,
          { id }
      );
  } catch (error) {
      console.error("Error deleting author:", error);
      throw error;
  }
}

async function getAuthorPageCount({ name, bookTitle, limit = 10 }) {
  try {
      const authors = await getAuthors({ name, bookTitle, limit: Infinity });
      return getPageCount(authors.length, limit);
  } catch (error) {
      console.error("Error getting author page count:", error);
      throw error;
  }
}

async function getPageCount(totalElements, limitPerPage) {
  try {
      return Math.ceil(totalElements / limitPerPage);
  } catch (error) {
      console.error("Error calculating page count:", error);
      throw error;
  }
}

module.exports = { createAuthor, updateAuthor, getAllAuthors, deleteAuthor, getAuthors, getPageCount, getAuthorPageCount };
