import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import React from "react";

const SignIn = () => {
  return (
    <section className="w-full flex">
        <div className="w-1/2">
            <AuthForm type="sign-in" />
        </div>
    </section>
  );
};

export default SignIn;
