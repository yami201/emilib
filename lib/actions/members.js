export const createMember = async (_, formData) => {
    console.log("Creating member");
    console.log(formData);

    return {
        message: 'success',
        data: {
            name: formData.get('name'),
            email: formData.get('email'),
            numero: formData.get('numero'),
            joiningDate: formData.get('joiningDate'),
        }
    }
}

export const updateMember = async (_, formData) => {
    console.log("Updating member");
    console.log(formData);

    return {
        message: 'success',
        data: {
            name: formData.get('name'),
            email: formData.get('email'),
            numero: formData.get('numero'),
            joiningDate: formData.get('joiningDate'),
        }
    }
}

export const deleteMember = async (member) => {
    console.log("Deleting member");
    console.log(member);

    return {
        message: 'error',
        data: "Failed to delete member"
    }
}