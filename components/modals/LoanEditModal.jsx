'use client'


import Input from "../ui/CustomInput";
import { useFormState } from 'react-dom';
import { updateLoan } from '@/lib/actions/loans';
import { toast } from "react-toast";
const status_options = [
    {
        value: 'active',
        label: 'Active'
    },
    {
        value: 'overdue',
        label: 'Overdue'
    },
    {
        value: 'done',
        label: 'Done'
    }
]

const LoanEditModal = ({ loan, closeModal }) => {
    const [state, formAction] = useFormState(updateLoan, {
        message: ''
    })

    if(state.message === 'error') {
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
                <label className="text-sm">Ending date</label>
                <select
                    name="status"
                    className="w-full border rounded-lg p-2 mt-2"
                    defaultValue={loan.status}
                >
                    {
                        status_options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>
                <div className="mt-4">
                    <label className="text-sm" defaultValue={loan.endingDate}>Ending date</label>
                    <Input
                        required
                        type="date"
                        name="ending_date"
                    />
                </div>
            </div>
            <div className="flex justify-between">
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg mt-6">Create</button>
                <button onClick={closeModal} className="bg-secondary text-white px-4 py-2 rounded-lg mt-6">Close</button>
            </div>
        </form>
    );
}

export default LoanEditModal;