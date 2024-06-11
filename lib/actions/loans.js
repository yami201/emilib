export const createLoan = async (_,formData) => {
    console.log("Creating loan");
    console.log(formData);

    return {
        message: 'success',
        data: {
            member: formData.get('member'),
            book: formData.get('book'),
            issueDate: formData.get('issueDate'),
            returnDate: formData.get('returnDate'),
        }
    }
}

export const updateLoan = async (_,formData) => {
    console.log("Updating loan");
    console.log(formData);

    return {
        message: 'success',
        data: {
            member: formData.get('member'),
            book: formData.get('book'),
            issueDate: formData.get('issueDate'),
            returnDate: formData.get('returnDate'),
        }
    }
}

export const deleteLoan = async (loan) => {
    console.log("Deleting loan");
    console.log(loan);

    return {
        message: 'success',
        data: "Failed to delete loan"
    }
}