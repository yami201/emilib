'use client'

import { deleteAuthor } from "@/lib/actions/authors";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from "react-toast";

const DeleteAuthor = ({ author }) => {
    const [state, formAction] = useFormState(deleteAuthor, {
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
            <button className="text-pink-500" onClick={() => formAction(author)}>Delete</button>
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

export default DeleteAuthor;