"use client";

import React, { useState } from "react";
import styles from "../utils/styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/actions/login.actions";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";

interface LoginProps {
  setSignedIn: (e: boolean) => void;
  setActiveState: (e: string) => void;
  setOpen: (e: boolean) => void;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password should have atleast 8 characters"),
});

type loginSchema = z.infer<typeof formSchema>;

const Login = ({ setActiveState, setSignedIn, setOpen }: LoginProps) => {
  const [Login, { loading, error, data }] = useMutation(LOGIN_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<loginSchema>({
    resolver: zodResolver(formSchema),
  });

  const [show, setShow] = useState(false);

  const onSubmit = async (data: loginSchema) => {
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };

      const response = await Login({
        variables: loginData,
      });
      if (response.data.Login.user) {
        toast.success("Login Successful!");
        Cookies.set("refresh_token", response.data.Login.refreshToken);
        Cookies.set("access_token", response.data.Login.accessToken);
        setOpen(false);
        reset();
        window.location.reload();
      } else {
        toast.error(response.data.Login.error.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <h1 className={`${styles.title}`}>Login with FoodDelivery</h1>
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <label className={`${styles.label}`}>Enter your Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="loginmail@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-500 mt-1">{`${errors.email?.message}`}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            {...register("password")}
            type={show ? "text" : "password"}
            placeholder="john@1234"
            className={`${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-red-500 mt-1">{`${errors.password?.message}`}</span>
        )}
        <div className="w-full mt-5">
          <span
            className={`text-[#2190ff] text-[16px] font-Poppins block text-right  cursor-pointer`}
            onClick={() => setActiveState("Forgot-Password")}
          >
            Forget your password?
          </span>
          <input
            type="submit"
            value="Login"
            disabled={isSubmitting}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <h5 className="text-center font-Poppins text-white text-[16px] pt-4">
          or Join with
        </h5>
        <div
          className="flex items-center justify-center my-3"
          onClick={() => signIn()}
        >
          <FcGoogle size={30} className="cursor-pointer mr-2" />
        </div>
        <h5 className="text-[14px] text-center pt-4 font-Poppins">
          Not have any account?{" "}
          <span
            onClick={() => setActiveState("Signup")}
            className="text-[#2190ff] pl-1 cursor-pointer"
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
