import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../../../firebase"; 
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../../firebase";
import { useRouter } from "next/router";
import { SiGoogle } from "react-icons/si";

type FormValues = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const router = useRouter();

  // Función para manejar el inicio de sesión con correo y contraseña
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      console.log("User signed in:", user);

      router.push("/"); // Redirigir tras inicio de sesión exitoso
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error signing in:", error.message);
      } else {
        console.error("An unknown error occurred during sign in.");
      }
    }
  };

  // Función para el inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google sign in user:", user);

      router.push("/"); // Redirigir tras inicio de sesión exitoso
    } catch (error) {
      if (error instanceof Error) {
        console.error("Google sign in error:", error.message);
      } else {
        console.error("An unknown error occurred during Google sign in.");
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required", 
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { 
                required: "Password is required", 
                minLength: { value: 6, message: "Password must be at least 6 characters long" }
              })}
              placeholder="Enter your password"
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn-primary">Sign In</button>
        </form>
        <div className="divider">or</div>
        <button className="btn-google" onClick={handleGoogleSignIn}>
          <SiGoogle style={{ marginRight: "8px" }} size={24} color="#DB4437" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
