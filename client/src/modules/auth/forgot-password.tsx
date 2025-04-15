"use client";

import UserRepository from "@/repository/userRepository";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import AuthValidation from "@/validations/authValidations";
import Image from "next/image";
import { AuthProps } from "@/types";
import ErrorService from "@/services/errorService";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import { AiOutlineLoading } from "react-icons/ai";

const defaultValues = {
  phone: "",
};

const ForgotPasswordModule = () => {
  const mutation = useMutation({
    mutationFn: (data: AuthProps) => UserRepository.forgotPassword(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: ({ data }) => {
      toast.success("Details for password recovery sent successfully...");
      window.location.replace("/reset-password?token=" + data?.data?.token);
    },
  });

  function submit(data: AuthProps) {
    mutation.mutate(data);
  }

  return (
    <div className="auth_form">
      <div className="mx-auto">
        <div className="grid grid-cols-2 gap-8 mx-auto min-h-screen py-12">
          <div className="hidden lg:col-span-1 lg:flex justify-end pr-0">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/assets/images/login.png"
              alt="Placeholder"
              className="w-full max-w-[600px] z-10 h-auto max-h-[580px] object-contain -mr-16"
            />
          </div>
          <div className="col-span-2 lg:col-span-1 flex items-center justify-center p-4 md:pr-8 py:12 lg:pl-24">
            <Formik
              initialValues={defaultValues}
              validationSchema={AuthValidation.forgotPassword}
              onSubmit={(value) => submit(value as AuthProps)}
              className="w-full"
            >
              {({ errors, touched }) => {
                return (
                  <Form className="w-full">
                    <h1 className="text-2xl font-bold mb-6 text-center border-b-4 border-b-[#53A4F5] border-solid max-w-fit">
                      Reset Password
                    </h1>
                    <p className=" mb-16 ">Enter the verification sent to your account and the new password</p>
                    <div className="mb-8">
                      <label htmlFor="phone" className="block mb-2 font-medium">
                        Phone Number *
                      </label>
                      <Field
                        id="phone"
                        name="phone"
                        type="tel"
                        className="block w-full px-4 py-4 rounded-md shadow-sm bg-white border-0 focus:outline-none focus:border-[#00a3f5]"
                      />
                      {touched.phone && errors.phone ? (
                        <div className="text-red-500 text-sm ml-3">{errors.phone}</div>
                      ) : null}
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="p-3 w-full flex justify-center items-center px-5 rounded-md bg-[#00a3f5] text-white font-medium"
                      >
                        {mutation.isPending ? <AiOutlineLoading className="mr-2 h-6 w-6 animate-spin" /> : null}
                        SUBMIT
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModule;
