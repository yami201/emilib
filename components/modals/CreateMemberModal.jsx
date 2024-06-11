"use client"

import Input from "../ui/Input";
import { useFormState } from "react-dom";
import { createMember } from "@/lib/actions/members";
import { useState } from "react";
import Image from 'next/image'
const CreateMemberModal = ({closeModal}) => {
    const [state, formAction] = useFormState(createMember, {
        message: '',
    })
    const [avatar, setAvatar] = useState(null) 

    const reload = () => {
        window.location.reload()
    }
    if(state.message === 'success'){
        return (
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-xl text-primary font-semibold">Member created successfully</h1>
                <button onClick={reload} className="bg-primary text-white px-4 py-2 rounded-lg">Close</button>
            </div>
        )
    }
    const uploadImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setAvatar(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return ( 
        <form className="p-4" action={formAction}>
            <h1 className="text-xl font-semibold">Create member</h1>
            <div className="flex items-center gap-6">
                <div>
                    {
                        avatar && (
                            <Image src={avatar} alt="avatar image for member" width={130} height={200} />
                        )
                    }
                    <input onChange={uploadImage} type="file" name="avatar" id="create-member-input" className="hidden" />
                    <label className="text-primary cursor-pointer" htmlFor="create-member-input">Upload avatar</label>
                </div>
                <div>
                    <div>
                        <label className="text-sm">Name</label>
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Enter member name"/>
                    </div>
                    <div className="mt-4">
                        <label className="text-sm">Email</label>
                        <Input 
                            type="email" 
                            name="email" 
                            placeholder="Enter member email"/>
                    </div>
                    <div className="mt-4">
                        <label className="text-sm">Phone</label>
                        <Input 
                            type="tel" 
                            name="numero"
                            placeholder="Enter member numero" />
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                <button className="bg-primary text-white px-4 py-2 rounded-lg">Save</button>
                <button type="button" onClick={closeModal} className="bg-secondary text-white px-4 py-2 rounded-lg">Cancel</button>
            </div>
        </form>
     );
}
 
export default CreateMemberModal;