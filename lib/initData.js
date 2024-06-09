require('dotenv').config();
const { createAuthor, createBook, createRelationship, session, driver } = require('./neo4j'); // Adjust the path if necessary

async function initializeData() {
  try {

    const author1 = await createAuthor('Author One');
    const author2 = await createAuthor('Author Two');


    const book1 = await createBook('Book One', '123-4567890123', 10);
    const book2 = await createBook('Book Two', '123-4567890124', 5);
 
    await createRelationship(author1.properties.name, book1.properties.title);
    await createRelationship(author2.properties.name, book2.properties.title);


    
    console.log('Initial data has been added to the database.');
  } catch (error) {
    console.error('Error initializing data:', error);
  } finally {
 
    await session.close();
    await driver.close();
  }
}

initializeData();
