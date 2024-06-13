"use client"

import { updateBook } from "@/lib/actions/books";
import Input from "../ui/CustomInput";
import { useFormState } from "react-dom";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toast";

const BookEdit = ({ book, closeModal, setBookData }) => {
    const [state, formAction] = useFormState(updateBook, {
        message: '',
    })
    const [cover, setCover] = useState(book.cover)

    const uploadImage = async (e) => {
        const file = e.target.files[0]
        setCover(URL.createObjectURL(file))
    }

    if(state.message === 'error') {
        toast.error(state.data)
    }

    if (state.message === 'success') {
        setBookData(state.data)
        return (
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-xl text-primary font-semibold">Book updated successfully</h1>
                <button onClick={closeModal} className="bg-primary text-white px-4 py-2 rounded-lg">Close</button>
            </div>
        )
    }


    return (
        <form className="bg-white p-4 rounded-lg" action={formAction}>
            <h1 className="text-xl font-semibold">Edit
                <span className="text-primary ml-2">{book.title}</span>
            </h1>
            <div className="flex items-center gap-10 mt-6">
                <div className="flex flex-col items-center">
                    <Image src={cover} alt={book.title} width={130} height={200} />
                    <input type="file" name="cover" className="hidden" id={'book' + book.id} onChange={uploadImage} />
                    <label className="text-primary cursor-pointer" htmlFor={'book' + book.id}>Upload cover</label>
                </div>
                <div>
                    <div className="">
                        <label className="text-sm">Title</label>
                        <Input
                            type="text"
                            name="title"
                            defaultValue={book.title}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-sm">Author</label>
                        <Input
                            type="text"
                            name="author"
                            defaultValue={book.author}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-sm">Quantity</label>
                        <Input
                            type="number"
                            name="quantity"
                            defaultValue={book.quantity}
                        />
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

export default BookEdit;