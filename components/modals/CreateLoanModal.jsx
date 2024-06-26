"use client"

import Input from "../ui/CustomInput";
import { useFormState } from "react-dom";
import { createLoan } from "@/lib/actions/loans";
import { toast } from "react-toast";
import { useLayoutEffect, useState } from "react";
const CreateLoanModal = ({ closeModal }) => {
    const [state, formAction] = useFormState(createLoan, {
        message: '',
    })
    const [books, setBooks] = useState([])
    const [members, setMembers] = useState([])


    useLayoutEffect(
        () => {
            const getBooks = async () => {
                const response = await fetch('/api/book')
                const json = await response.json()
                setBooks(json)
            }
            const getMembers = async () => {
                const response = await fetch('/api/member')
                const json = await response.json()
                setMembers(json)
            }
            getBooks()
            getMembers()
        }, []
    )

    if (state.message === 'error') {
        toast.error(state.data)
    }

    if (state.message === 'success') {
        return (
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-xl text-primary font-semibold">Loan updated successfully</h1>
                <button onClick={closeModal} className="bg-primary text-white px-4 py-2 rounded-lg">Close</button>
            </div>
        )
    }

    return (
        <form className="bg-white p-4 rounded-lg" action={formAction}>
            <h1 className="text-xl font-semibold">Create new loan</h1>
            <div className="mt-4">
                <label className="text-sm">Book</label>
                <select
                    required
                    className="w-full border p-2 rounded-lg"
                    name="book"
                >
                    <option unselectable="on" value=''>Select a book</option>
                    {
                        books.map(
                            book => (
                                <option value={book.isbn}>{book.title}</option>
                            )
                        )
                    }
                </select>
            </div>
            <div className="mt-4">
                <label className="text-sm">Member</label>
                <select
                    required
                    className="w-full border p-2 rounded-lg"
                    name="member"
                >
                    <option unselectable="on" value=''>Select a member</option>
                    {
                        members.map(
                            member => (
                                <option value={member._id}>{member.name}</option>
                            )
                        )
                    }
                </select>

            </div>
            <div className="mt-4">
                <label className="text-sm">Starting date</label>
                <Input
                    type="date"
                    name="startingDate"
                    required
                />
            </div>
            <div className="mt-4">
                <label className="text-sm">Ending date</label>
                <Input
                    type="date"
                    name="endingDate"
                    required
                />
            </div>
            <div className="flex justify-between">
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg mt-6">Create</button>
                <button onClick={closeModal} className="bg-secondary text-white px-4 py-2 rounded-lg mt-6">Close</button>
            </div>
        </form>


    );
}

export default CreateLoanModal;