"use client"

import Input from "../ui/Input";
import { useFormState } from "react-dom";
import Image from "next/image";
import { useState } from "react";
import { createBook } from "@/lib/actions/books";
import { toast } from "react-toast";
import AuthorSelector from "../AuthorSelector";


const CreateBook = ({closeModal}) => {
    const [state, formAction] = useFormState(createBook, {
        message: '',
    })
    const [cover, setCover] = useState(null)
    const [authors, setAuthors] = useState([])

    if(state.message === 'error') {
        toast.error(state.data)
    }
    if (state.message === 'success') {
        return (
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-xl text-primary font-semibold">Book created successfully</h1>
                <button onClick={closeModal} className="bg-primary text-white px-4 py-2 rounded-lg">Close</button>
            </div>
        )
    }

    const uploadImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setCover(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.append('authors',JSON.stringify(authors.map(a=> a.id)))
        formAction(formData)
    }

    return ( 
        <form className="bg-white p-4 rounded-lg" onSubmit={handleSubmit}>
            <h1 className="text-xl font-semibold">Create new book</h1>
            <div className="flex items-center gap-10 mt-6">
                <div className="flex flex-col items-center">
                    {
                        cover && (
                            <Image src={cover} alt="cover image for book" width={130} height={200} />
                        )
                    }
                    <input required type="file" name="cover" className="hidden" id="create-book-input" onChange={uploadImage} />
                    <label className="text-primary cursor-pointer" htmlFor="create-book-input">Upload cover</label>
                </div>
                <div>
                    <div>
                        <label className="text-sm">Title</label>
                        <Input
                            required
                            type="text"
                            name="title"
                            placeholder={"Enter book title"}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-sm">ISBN</label>
                        <Input
                            required
                            type="text"
                            name="isbn"
                            placeholder={"Enter book title"}
                        />
                    </div>
                    <div className="mt-4">
                        <AuthorSelector 
                            authors={authors}
                            setAuthors={setAuthors}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-sm">Quantity</label>
                        <Input
                            required
                            type="number"
                            name="quantity"
                            placeholder={"Enter book quantity"}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                <button className="bg-primary text-white px-4 py-2 rounded-lg">Create</button>
                <button type="button" onClick={closeModal} className="bg-secondary text-white px-4 py-2 rounded-lg">Cancel</button>
            </div>
        </form>
     );
}
 
export default CreateBook;