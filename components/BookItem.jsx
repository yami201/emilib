"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Pen } from "./ui/icons";
import Image from "next/image";
import { useState } from "react";
import BookEdit from "./modals/BookEditModal";
import DeleteBook from "./delete-inputs/DeleteBook";

const BookItem = ({ book }) => {
    const [show, setShow] = useState(false)
    const [bookData, setBookData] = useState(book)
    const showModal = () => {
        setShow(true)
    }
    const closeModal = () => {
        setShow(false)
    }
    return (
        <>
            <div className="w-[130] flex flex-col">
                <div className="relative z-0  book-item" >
                    <Image src={bookData.cover} alt={bookData.title} width={130} height={200} />
                    {
                        !bookData.quantity && (
                            <div className="absolute top-1 left-1 p-2 bg-white rounded-full text-pink-500 text-xs">Sold out!</div>
                        )
                    }
                    <div onClick={showModal} className="absolute hidden cursor-pointer top-1 right-1 p-2 bg-white transition duration-300 rounded-full edit-button">
                        <Pen />
                    </div>
                </div>
                <div className="flex w-full justify-between">
                    <p className="text-sm text-gray-500 text-center ">Id: {bookData.id}</p>
                    <p className="text-sm text-gray-500 text-center ">{book.quantity} / {book.initialQuantity}</p>
                </div>
                <h1 className="text-lg font-semibold mt-2 text-center">{bookData.title}</h1>
                <p className="text-sm text-gray-500 text-center">{bookData.author}</p>
                <DeleteBook book={bookData} />
            </div>
            <AnimatePresence>
                {
                    show && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className="absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                            <motion.div
                                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: 100, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="bg-white p-4 rounded-lg">
                                <BookEdit
                                    book={book}
                                    closeModal={closeModal}
                                    setBookData={setBookData} />
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    );
}

export default BookItem;