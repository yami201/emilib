"use server";
import { revalidateTag } from "next/cache";


export const updateBook = async (_, formData) => {
  if (!formData.get("cover") || formData.get("cover").size === 0) {
    console.log("No cover image");
  } else {
    const buffer = await formData.get("cover").arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return {
      message: "success",
      data: {
        title: formData.get("title"),
        title: "Hello there",
        author: "F. Scott Fitzgerald",
        id: 1,
        quantity: 1,
        cover: "data:image/png;base64," + base64,
      },
    };
  }
};


export const createBook = async (_, formData) => {
    try {
      const cover = formData.get('cover')
      const fileBuffer = Buffer.from(await cover.arrayBuffer())
      const base64 = fileBuffer.toString('base64')
      const response = await fetch(process.env.URL+'/api/book',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.get('title'),
          cover: base64,
          quantity: formData.get('quantity'),
          isbn: formData.get('isbn'),
          authors: JSON.parse(formData.get('authors'))
        })
      })
      if(response.status=== 200){
        revalidateTag('books')
        revalidateTag('authors')
        return {
          message : 'success'
        }
      } else {
        const json = response.json()
        return {
          message: 'error',
          data: json.message
        }
      }
    } catch (error) {
      return {
        message: 'error',
        data: error.message
      }
    }
}
export const deleteBook = async (book) => {
    console.log("Deleting book");
    console.log(book)

    return {
        message: 'error',
        data: "Failed to delete book"
    }
}

