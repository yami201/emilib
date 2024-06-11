import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import React from "react";

const SignUp = async() => {

  return (
    <section className="w-full flex">
      <div className="w-1/2">
        <AuthForm type="sign-up" />
      </div>
      <div className="w-1/2 bg-blue-50">
        <Image src="/Loans.png" alt="Sign Up" width={500} height={500} />
      </div>
    </section>
  );
};

export default SignUp;
