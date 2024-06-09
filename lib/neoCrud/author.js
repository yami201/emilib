
async function createAuthor(name) {
    const result = await session.run(
      'CREATE (a:Author {name: $name}) RETURN a',
      { name }
    );
    return result.records[0].get('a');
  }


async function getAuthors({ name, bookTitle, limit = 10, skip = 0 }) {
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
  }
  

  async function updateAuthor(name, updates) {
    const setString = Object.keys(updates).map(key => `a.${key} = $${key}`).join(', ');
    const params = { name, ...updates };
  
    const result = await session.run(
      `MATCH (a:Author {name: $name}) SET ${setString} RETURN a`,
      params
    );
    return result.records[0].get('a');
  }

  async function deleteAuthor(name) {
    await session.run(
      `MATCH (a:Author {name: $name}) DETACH DELETE a`,
      { name }
    );
  }

  module.exports = { createAuthor,updateAuthor,deleteAuthor, getAuthors };