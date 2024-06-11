import { deleteBook } from "@/lib/actions/books";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from "react-toast";
const DeleteBook = ({ book }) => {
    const [state, formAction] = useFormState(deleteBook, {
        message: '',
    })

    if(state.message === 'success') {
        window.location.reload()
    }
    if(state.message === 'error') {
        toast.error(state.data)
    }

    return (
        <>
            <button className="text-pink-500 mt-auto" onClick={() => formAction(book)}>Delete</button>
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

export default DeleteBook;