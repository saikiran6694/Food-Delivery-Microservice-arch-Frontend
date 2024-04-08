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
import { REGISTER_USER } from "../graphql/actions/register.actions";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be atleast of 3 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password should have atleast 8 characters"),
  phone_number: z.number().min(10, "Phone number should be of 10 characters"),
});

type signupSchema = z.infer<typeof formSchema>;

const Signup = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [regitserUserMutation, { loading, error, data }] =
    useMutation(REGISTER_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<signupSchema>({
    resolver: zodResolver(formSchema),
  });

  const [show, setShow] = useState(false);

  const onSubmit = async (data: signupSchema) => {
    try {
      const response = await regitserUserMutation({ variables: data });
      localStorage.setItem(
        "activation_Token",
        response.data.register.activation_token
      );
      toast.success("Please check your email inbox");
      reset();
      setActiveState("Verification");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <h1 className={`${styles.title}`}>Sign up with FoodDelivery</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-2 gap-2">
          <div>
            <label className={`${styles.label}`}>Enter your name</label>
            <input
              {...register("name")}
              type="name"
              placeholder="johndoe***"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-full relative">
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
          </div>

          <div className="w-full relative">
            <label className={`${styles.label}`}>Enter your phone_number</label>
            <input
              {...register("phone_number", { valueAsNumber: true })}
              type="number"
              placeholder="99999*****"
              className={`${styles.input}`}
            />
            {errors.phone_number && (
              <span className="text-red-500 mt-1">{`${errors.phone_number?.message}`}</span>
            )}
          </div>

          <div className="w-full relative">
            <label htmlFor="password" className={`${styles.label}`}>
              Enter your password
            </label>
            <div className="flex justify-between items-center w-full border rounded">
              <input
                {...register("password")}
                type={show ? "text" : "password"}
                placeholder="john@1234"
                className={`w-full bg-transparent rounded h-[40px] px-2 outline-none font-Poppins`}
              />
              {!show ? (
                <AiOutlineEyeInvisible
                  className="z-1 cursor-pointer mr-2"
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className="z-1 cursor-pointer mr-2"
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
            </div>
            {errors.password && (
              <span className="text-red-500 mt-1">{`${errors.password?.message}`}</span>
            )}
          </div>
        </div>
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Signup"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <h5 className="text-center font-Poppins text-white text-[16px]">
          or Join with
        </h5>
        <div className="flex justify-center items-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-[14px] text-center font-Poppins">
          Already have any account?{" "}
          <span
            onClick={() => setActiveState("Login")}
            className="text-[#2190ff] pl-1 cursor-pointer"
          >
            Login
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Signup;
