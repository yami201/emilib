"use client"

import Input from "../ui/Input";
import { useFormState } from "react-dom";
import { createLoan } from "@/lib/actions/loans";
import { toast } from "react-toast";
const CreateLoanModal = ({ closeModal }) => {
    const [state, formAction] = useFormState(createLoan, {
        message: '',
    })
    const reload = () => {
        window.location.reload()
    }

    if(state.message === 'error') {
        toast.error(state.data)
    }

    if (state.message === 'success') {
        return (
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-xl text-primary font-semibold">Loan updated successfully</h1>
                <button onClick={reload} className="bg-primary text-white px-4 py-2 rounded-lg">Close</button>
            </div>
        )
    }

    return (
        <form className="bg-white p-4 rounded-lg" action={formAction}>
            <h1 className="text-xl font-semibold">Create new loan</h1>
            <div className="mt-4">
                <label className="text-sm">Book</label>
                <Input
                    type="number"
                    name="book"
                    required
                    placeholder="Enter book id"
                />
            </div>
            <div className="mt-4">
                <label className="text-sm">Member</label>
                <Input
                    type="number"
                    name="member"
                    required
                    placeholder="Enter member id"
                />
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