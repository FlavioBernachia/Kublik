import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../../firebase";
import { useRouter } from "next/router";
import { SiGoogle } from "react-icons/si";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Crear el usuario con correo y contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Actualizar el perfil del usuario con el username
      await updateProfile(user, { displayName: data.username });

      console.log("User created:", user);

      // Redirigir tras registro exitoso
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating user:", error.message);
      } else {
        console.error("An unknown error occurred during user creation.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google sign in user:", user);

      // Redirigir tras inicio de sesión exitoso
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Google sign in error:", error.message);
      } else {
        console.error("An unknown error occurred during Google sign in.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
            />
            {errors.username && <p className="error">{errors.username.message}</p>}
          </div>
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
          <button type="submit" className="btn-primary">Sign Up</button>
        </form>
        <div className="divider">or</div>
        <button className="btn-google" onClick={handleGoogleSignIn}>
          <SiGoogle style={{ marginRight: "8px" }} size={24} color="#DB4437" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;