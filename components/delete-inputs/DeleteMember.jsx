'use client'

import { deleteMember } from "@/lib/actions/members";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from "react-toast";

const DeleteMember = ({ member }) => {
    const [state, formAction] = useFormState(deleteMember, {
        message: '',
    })

    if (state.message === 'success') {
        window.location.reload()
    }
    if (state.message === 'error') {
        toast.error(state.data)
    }
    return (
        <>
            <button className="text-pink-500" onClick={() => formAction(member)}>Delete</button>
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

export default DeleteMember;