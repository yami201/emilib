import clientPromise from "../dbConnect";
import { ObjectId } from "mongodb";

export const createFullBook = async (data) => {
  const book = {
    title: data.title,
    cover: data.cover,
    initialQuanity: data.quantity,
    quantity: data.quantity,
    isbn: data.isbn,
  };

  const client = await clientPromise;
  const db = client.db("emilib");
  return await db.collection("books").insertOne(book);
};

export const getBooks = async () => {
  const client = await clientPromise;
  const db = client.db("emilib");
  return db.collection("books").find({}).toArray();
};

export const findBooksByQuery = async (query) => {
  const client = await clientPromise;
  if (query.hasOwnProperty("_id")) {
    let id = query._id;
    query._id = new ObjectId(id);
  }
  const db = client.db("emilib");
  return db.collection("books").find(query).toArray();
};

export const decrementQuantity = async (query) => {
  const client = await clientPromise;
  const db = client.db("emilib");
  const result = await db
    .collection("books")
    .findOneAndUpdate(
      { isbn: query.isbn },
      { $inc: { quantity: -1 } },
      { returnOriginal: false }
    );
  return result;
};

export const deleteBook = async (isbn) => {
  const client = await clientPromise;
  const db = client.db("emilib");
  const result = await db.collection("books").deleteOne({ isbn });

  return result
};
