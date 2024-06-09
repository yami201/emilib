const { createAuthor, createBook, createRelationship } = require('./lib/neo4j');
const { getBooks, updateBook, deleteBook}= require('./lib/neoCrud/book')
const {getAuthors, updateAuthor,deleteAuthor} = require('./lib/neoCrud/author')
async function testFunctions() {
  try {
    // Create an author
    const author = await createAuthor('J.K. Rowling');
    console.log('Author created:', author);

    // Create a book
    const book = await createBook('Harry Potter', '1234567890', 10);
    console.log('Book created:', book);

    // Create a relationship
    const relationship = await createRelationship('J.K. Rowling', 'Harry Potter');
    console.log('Relationship created:', relationship);

    // Get books
    const books = await getBooks({});
    console.log('Books:', books);

    // Get authors
    const authors = await getAuthors({});
    console.log('Authors:', authors);

    // Update book
    const updatedBook = await updateBook('Harry Potter', { quantity: 5 });
    console.log('Book updated:', updatedBook);

    // Update author
    const updatedAuthor = await updateAuthor('J.K. Rowling', { name: 'Joanne Rowling' });
    console.log('Author updated:', updatedAuthor);

    // Delete book
    await deleteBook('Harry Potter');
    console.log('Book deleted');

    // Delete author
    await deleteAuthor('Joanne Rowling');
    console.log('Author deleted');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the session and driver
    session.close();
    driver.close();
  }
}

testFunctions();
