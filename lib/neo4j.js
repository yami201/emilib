require('dotenv').config();
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

const session = driver.session();

async function createAuthor(name) {
  const result = await session.run(
    'CREATE (a:Author {name: $name}) RETURN a',
    { name }
  );
  return result.records[0].get('a');
}

async function createBook(title, isbn, quantity) {
  const result = await session.run(
    'CREATE (b:Book {title: $title, isbn: $isbn, quantity: $quantity}) RETURN b',
    { title, isbn, quantity }
  );
  return result.records[0].get('b');
}

async function createRelationship(authorName, bookTitle) {
  const result = await session.run(
    `
    MATCH (a:Author {name: $authorName}), (b:Book {title: $bookTitle})
    CREATE (a)-[:WROTE]->(b)
    RETURN a, b
    `,
    { authorName, bookTitle }
  );
  return result.records[0];
}

module.exports = { createAuthor, createBook, createRelationship, session, driver };
