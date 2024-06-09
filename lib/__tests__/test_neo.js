const {  getAuthors, updateAuthor, deleteAuthor,  getBooks, updateBook, deleteBook  } = require('../neoCrudd'); // adjust the path as necessary
const {createAuthor,createBook,createRelationship}=require('../neo4j')
describe('Neo4j CRUD operations', () => {
  test('createAuthor creates a new author', async () => {
    const author = await createAuthor('Test Author');
    expect(author.properties.name).toBe('Test Author');
  });

  test('getAuthors retrieves authors', async () => {
    const authors = await getAuthors();
    expect(authors.length).toBeGreaterThan(0);
  });

  test('updateAuthor updates an author name', async () => {
    const newAuthor = await createAuthor('Author to Update');
    const updatedAuthor = await updateAuthor(newAuthor.identity.toString(), 'Updated Author');
    expect(updatedAuthor.properties.name).toBe('Updated Author');
  });

  test('deleteAuthor deletes an author', async () => {
    const newAuthor = await createAuthor('Author to Delete');
    const deletedAuthor = await deleteAuthor(newAuthor.identity.toString());
    expect(deletedAuthor).not.toBeNull();
  });

  test('createBook creates a new book', async () => {
    const book = await createBook('Test Book', '123456789', 5);
    expect(book.properties.title).toBe('Test Book');
  });

  test('getBooks retrieves books', async () => {
    const books = await getBooks();
    expect(books.length).toBeGreaterThan(0);
  });

  test('updateBook updates a book', async () => {
    const newBook = await createBook('Book to Update', '987654321', 10);
    const updatedBook = await updateBook(newBook.identity.toString(), 'Updated Book', '987654321', 15);
    expect(updatedBook.properties.title).toBe('Updated Book');
  });

  test('deleteBook deletes a book', async () => {
    const newBook = await createBook('Book to Delete', '111111111', 1);
    const deletedBook = await deleteBook(newBook.identity.toString());
    expect(deletedBook).not.toBeNull();
  });

  test('createRelationship creates a relationship between author and book', async () => {
    const author = await createAuthor('Author with Relationship');
    const book = await createBook('Book with Relationship', '222222222', 1);
    const relationship = await createRelationship(author.properties.name, book.properties.title);
    expect(relationship).not.toBeNull();
  });
});
