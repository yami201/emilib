"use server"


export const createAuthor = (_,formData) => {
    console.log("Creating author");
    console.log(formData)

    return {
        message: 'success',
        data: {
            name: formData.get('name'),
        }
    }
}


export const updateAuthor = (_,formData) => {
    console.log("Updating author");
    console.log(formData)

    return {
        message: 'success',
        data: {
            name: formData.get('name'),
        }
    }
}

export const deleteAuthor = (author) => {
    console.log("Deleting author");
    console.log(author)

    return {
        message: 'error',
        data : "Failed to delete author"
    }
}
 