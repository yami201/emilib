"use server"

import { revalidateTag } from "next/cache";
export const createAuthor = async (_,formData) => {
    try {
        const avatar = formData.get('avatar')
        const fileBuffer = Buffer.from(await avatar.arrayBuffer());
        const base64 = fileBuffer.toString('base64');

        const response = await fetch(process.env.URL+"/api/author",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name : formData.get('name'),
                avatar: base64
            })
        })

        if(response.status === 201) {
            revalidateTag('authors')
            return { 
                message: 'success'
            }
        } else {
            const json = await response.json()
            return {
                message: 'error',
                data: json.message
            }
        }
    } catch (error) {
        return {
            message: 'error',
            data: 'Could not create member'
        }
    }
}


export const updateAuthor = (_,formData) => {

    return {
        message: 'success',
        data: {
            name: formData.get('name'),
        }
    }
}

export const deleteAuthor = (author) => {


    return {
        message: 'error',
        data : "Failed to delete author"
    }
}
 