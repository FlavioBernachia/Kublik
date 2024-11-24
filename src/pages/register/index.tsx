import React from "react";
import RegisterForm from "@/components/register/registerForm";
import Header from "@/components/header/header";


const RegisterPage: React.FC = () => {
  return (
    <>
    <Header/>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;