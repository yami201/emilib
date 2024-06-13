import neoDriver from "../dbConnect";

export const createBook = async (data) => {
  const session = neoDriver.session()
  await session.run("CREATE (b:Book {isbn: $isbn, title: $title})", {
    isbn: data.isbn,
    title: data.title
  });

  for (const id of data.authors) {
    await session.run(
      `
                MATCH (b:Book {isbn: $isbn})
                MATCH (a:Author {id: $id})
                CREATE (a)-[:WROTE]->(b)
                `,
      { isbn: data.isbn, id }
    );
  }
  session.close()
};

export const getAuthorsOfBook = async (isbn) => {
  const session = neoDriver.session()
  const result = await session.run(
    `
            MATCH (a:Author)-[:WROTE]->(b:Book {isbn: $isbn})
            RETURN collect(a.name) AS authors
            `,
    { isbn }
  );

  if (result.records.length > 0) {
    const authors = result.records[0].get("authors");
    session.close()
    return authors;
  } else {
    session.close()
    return [];
  }
};

export const deleteBookEntity = async (isbn) => {
  const session = neoDriver.session()
  await session.run(
    `
            MATCH (b:Book {isbn: $isbn})
            DETACH DELETE b
            `,
    { isbn }
  );
  session.close()
};
