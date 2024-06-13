"use client"

import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";



const AuthorSelector = ({ authors, setAuthors }) => {
    const [options, setOptions] = useState([])
    const [searchField, setSearchField] = useState('')
    useLayoutEffect(
        () => {
            const fetchOptions = async () => {
                const response = await fetch("/api/author")
                const json = await response.json()
                if (response.status === 200) {
                    setOptions(json)
                }
            }

            fetchOptions()
        }, []
    )

    useEffect(
        () => {
            setOptions(prev => prev.filter(op => !authors.includes(op)))
        }, [authors]
    )
    const handleChange = (e) => {
        setSearchField(e.target.value)
    }

    const addAuthor = () => {
        if(searchField === '') return
        setAuthors(
            [
                ...authors, 
                options.find(auth => auth.id === searchField)
            ]
        )
        setSearchField('')
    }
    const deleteAuthor = (author) => {
        setAuthors(authors.filter(a => a !== author))
    }
    return (
        <div>
            <div className="flex items-center gap-2">
                <select
                    className="w-full border p-2 rounded-lg"
                    value={searchField}
                    onChange={handleChange}
                >
                    <option unselectable='on' value=''>Add an author</option>
                    {
                        options.length !== 0 && (
                            options.map((author) => (
                                <option value={author.id} key={author.id}>{author.name}</option>
                            ))

                        )
                    }
                </select>
                <button onClick={addAuthor} type="button" className="px-2 py-1 rounded bg-primary text-white">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                <AnimatePresence>
                    {
                        authors.map((author, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: -15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center rounded-2xl px-2 py-1 bg-primary text-white text-sm gap-1">
                                <p>{author.name}</p>
                                <button
                                    onClick={deleteAuthor.bind(null, author)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </motion.div>
                        ))
                    }
                </AnimatePresence>
            </div>
        </div>
    );
}

export default AuthorSelector;