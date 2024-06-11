"use client"

import { AnimatePresence, motion } from "framer-motion";
import MemberEditModal from "./modals/MemberEditModal";
import { useState } from "react";

const MemberEdit = ({member}) => {
    const [show, setShow] = useState(false)
    
    const showModal = () => {
        setShow(true)
    }
    const closeModal = () => {
        setShow(false)
    }
    return ( 
        <div>
            <button onClick={showModal} className="text-primary p-2 rounded transition duration-300 hover:bg-primary hover:text-white">Edit</button>


            <AnimatePresence>
                {
                    show && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className="z-10 absolute top-0 left-0 w-full h-full backdrop-blur bg-black bg-opacity-50 flex justify-center items-center">
                            <motion.div
                                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: 100, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="bg-white p-4 rounded-lg">
                                <MemberEditModal
                                    member={member} 
                                    closeModal={closeModal} />
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
     );
}
 
export default MemberEdit;