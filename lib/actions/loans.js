"use server"

import { revalidateTag } from "next/cache";

export const createLoan = async (_, formData) => {
  try {
    const response = await fetch(process.env.URL+'/api/loan', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        member: formData.get("member"),
        book: formData.get("book"),
        issueDate: formData.get("startingDate"),
        returnDate: formData.get("endingDate"),
      }),
    });
    if (response.status === 201) {
      revalidateTag("loans");
      revalidateTag("members");
      revalidateTag("books");
      return {
        message: "success",
      };
    } else {
        return {
            message: 'error',
            data: 'Could not create loan'
        }
    }
  } catch (error) {
    console.error(error)
    return {
      message: "error",
      data: error.message,
    };
  }
};

export const updateLoan = async (_, formData) => {
  console.log("Updating loan");
  console.log(formData);

  return {
    message: "success",
    data: {
      member: formData.get("member"),
      book: formData.get("book"),
      issueDate: formData.get("issueDate"),
      returnDate: formData.get("returnDate"),
    },
  };
};

export const deleteLoan = async (loan) => {
  console.log("Deleting loan");
  console.log(loan);

  return {
    message: "success",
    data: "Failed to delete loan",
  };
};
