import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import React from "react";

const SignUp = async() => {

  return (
    <section className="w-full flex">
      <div className="w-1/2">
        <AuthForm type="sign-up" />
      </div>
    </section>
  );
};

export default SignUp;
