'use client'

import { deleteLoan } from "@/lib/actions/loans";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from "react-toast";

const DeleteLoan = ({ loan }) => {
    const [state, formAction] = useFormState(deleteLoan, {
        message: '',
    })

    if (state.message === 'error') {
        toast.error(state.data)
    }
    return (
        <>
            <button className="text-pink-500" onClick={() => formAction(loan)}>Delete</button>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default DeleteLoan;