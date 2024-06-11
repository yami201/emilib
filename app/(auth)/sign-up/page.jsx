import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import React from "react";

const SignUp = async() => {

  return (
    <section className="w-full flex">
      <div className="w-1/2">
        <AuthForm type="sign-up" />
      </div>
      <div className="w-1/2 bg-blue-50 flex items-center justify-center p-8">
          <Image src="/Loans.png" alt="Sign Up" width={500} height={500} className="border-2 border-black rounded-lg"/>
      </div>
    </section>
  );
};

export default SignUp;
