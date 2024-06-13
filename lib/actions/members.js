"use server"
import { revalidateTag } from "next/cache";
export const createMember = async (_, formData) => {
    
    try {
        const avatar = formData.get('avatar')
        const fileBuffer = Buffer.from(await avatar.arrayBuffer());
        const base64 = fileBuffer.toString('base64');

        const response = await fetch(process.env.URL+ "/api/member",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name : formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                avatar: base64,
            })
        })
        if(response.status === 201) {
            revalidateTag('members')
            return {
                message: 'success',
            }
        } else {
            const json = await response.json()
            return {
                message: 'error',
                data: json.message
            }
        }

    } catch (error) {
        console.log(error)
        return {
            message : 'error',
            data: 'Could not create member'
        }
    }
}

export const updateMember = async (_, formData) => {
    console.log("Updating member");
    console.log(formData);

    return {
        message: 'success',
        data: {
            name: formData.get('name'),
            email: formData.get('email'),
            numero: formData.get('numero'),
            joiningDate: formData.get('joiningDate'),
        }
    }
}

export const deleteMember = async (member) => {
    console.log("Deleting member");
    console.log(member);

    return {
        message: 'error',
        data: "Failed to delete member"
    }
}