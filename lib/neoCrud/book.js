

async function createBook(title, isbn, quantity) {
    const result = await session.run(
      'CREATE (b:Book {title: $title, isbn: $isbn, quantity: $quantity}) RETURN b',
      { title, isbn, quantity }
    );
    return result.records[0].get('b');
  }

async function getBooks({ name, author, isbn, outOfStock, limit = 10, skip = 0 }) {
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
  }

  async function updateBook(title, updates) {
    const setString = Object.keys(updates).map(key => `b.${key} = $${key}`).join(', ');
    const params = { title, ...updates };
  
    const result = await session.run(
      `MATCH (b:Book {title: $title}) SET ${setString} RETURN b`,
      params
    );
    return result.records[0].get('b');
  }
  
  
  
  async function deleteBook(title) {
    await session.run(
      `MATCH (b:Book {title: $title}) DETACH DELETE b`,
      { title }
    );
  }
  
  module.exports = { createBook,updateBook,deleteBook, getBooks };