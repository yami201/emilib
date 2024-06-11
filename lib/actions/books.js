"use server";

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
    console.log("Creating book");
    console.log(formData)

    return {
        message: 'success',
        data: {
            title: formData.get('title'),
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

