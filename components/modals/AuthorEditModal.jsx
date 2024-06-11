import Input from "../ui/Input";

import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { updateAuthor } from "@/lib/actions/authors";
import { toast } from "react-toast";


const AuthordEditModal = ({ author, closeModal }) => {
    const [state, formAction] = useFormState(updateAuthor, {
        message: '',
    })
    const [avatar, setAvatar] = useState(author.avatar)

    const reload = () => {
        window.location.reload()
    }
    
    if(state.message === 'error') {
        toast.error(state.data)
    }

    if (state.message === 'success') {
        return (
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-xl text-primary font-semibold">Author updated successfully</h1>
                <button onClick={reload} className="bg-primary text-white px-4 py-2 rounded-lg">Close</button>
            </div>
        )
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setAvatar(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <form className="p-4" action={formAction}>
            <h1 className="text-xl font-semibold">Edit author</h1>
            <div className="w-full flex flex-col items-center">
                <Image src={avatar} alt="author avatar" width={130} height={130} />
                <input onChange={uploadImage} type="file" name="avatar" id={`author` + author.id} className="hidden" />
                <label className="text-primary cursor-pointer" htmlFor={`author` + author.id}>Upload avatar</label>
            </div>
            <div>
                <label className="text-sm">Name</label>
                <Input
                    type="text"
                    name="name"
                    defaultValue={author.name} />
            </div>

            <div className="mt-4 flex justify-between">
                <button className="bg-primary text-white px-4 py-2 rounded-lg">Save</button>
                <button type="button" onClick={closeModal} className="bg-secondary text-white px-4 py-2 rounded-lg">Cancel</button>
            </div>
        </form>
        
    );
}

export default AuthordEditModal;