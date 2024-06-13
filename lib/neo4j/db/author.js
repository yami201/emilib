import neoDriver from "../dbConnect";

export const createAuthor = async (data) => {
  const session = neoDriver.session()
  const authorId = Date.now().toString();
  const dateAdded = new Date().toISOString().split("T")[0];
  await session.run(
    "CREATE (a:Author {id: $id, name: $name, avatar: $avatar, dateAdded: $dateAdded})",
    { id: authorId, name: data.name, avatar: data.avatar, dateAdded }
  );

  session.close()
};

export const getAuthors = async (query) => {
  const session = neoDriver.session()
  let matchQuery = "";
  let params = {};

  if (query?.name) {
    matchQuery = "MATCH (a:Author) WHERE a.name CONTAINS $query";
    params.query = query.name;
  } else if (query?.isbn) {
    matchQuery = `
            MATCH (b:Book {isbn: $query})<-[:WROTE]-(a:Author)
        `;
    params.query = query.isbn;
  } else {
    matchQuery = "MATCH (a:Author)";
  }

  const resultQuery = `
        ${matchQuery}
        OPTIONAL MATCH (a)-[:WROTE]->(b:Book)
        RETURN a, COUNT(b) AS books
    `;
  const result = await session.run(resultQuery, params);
  const authors = result.records.map((record) => {
    const author = record.get("a").properties;
    author.books = record.get("books").low;
    return author;
  });

  if(Object.keys(authors).length === 0){
    return []
  }

  session.close()
  return authors;
};

export const deleteAuthor = async (id) => {
  const session = neoDriver.session()
  await session.run("MATCH (a:Author {id: $id}) DETACH DELETE a", {
    id: id,
  });
  session.close()
};


