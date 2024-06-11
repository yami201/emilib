import Input from "../ui/Input";

import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { updateMember } from "@/lib/actions/members";

const MemberEditModal = ({member, closeModal }) => {
    const [state, formAction] = useFormState(updateMember, {
        message: '',
    })
    const [avatar, setAvatar] = useState(member.avatar)

    const reload = () => {
        window.location.reload()
    }

    if(state.message === 'success') {
        return (
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-xl text-primary font-semibold">Loan created successfully</h1>
                <button onClick={reload} className="bg-primary text-white px-4 py-2 rounded-lg">Close</button>
            </div>
        )
    }

    console.log(avatar)

    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setAvatar(reader.result)
        }
        reader.readAsDataURL(file)
    }
    return ( 
        <form className="p-4" action={formAction}>
            <h1 className="text-xl font-semibold">Edit member</h1>
            <div className="flex items-center gap-6">
                <div>
                    <Image src={avatar} alt="member avatar" width={130} height={130} />
                    <input onChange={uploadImage} type="file" name="avatar" id={`member`+member.id} className="hidden" />
                    <label className="text-primary cursor-pointer" htmlFor={`member`+member.id}>Upload avatar</label>
                </div>
                <div>
                    <div>
                        <label className="text-sm">Name</label>
                        <Input 
                            type="text" 
                            name="name" 
                            defaultValue={member.name}/>
                    </div>
                    <div className="mt-4">
                        <label className="text-sm">Email</label>
                        <Input 
                            type="email" 
                            name="email" 
                            defaultValue={member.email}/>
                    </div>
                    <div className="mt-4">
                        <label className="text-sm">Phone</label>
                        <Input 
                            type="tel" 
                            name="numero"
                            defaultValue={member.numero} />
                    </div>
                </div>

            </div>
            <div className="mt-4 flex justify-between">
                <button className="bg-primary text-white px-4 py-2 rounded-lg">Save</button>
                <button type="button" onClick={closeModal} className="bg-secondary text-white px-4 py-2 rounded-lg">Cancel</button>
            </div>
        </form>
        
     );
}
 
export default MemberEditModal;