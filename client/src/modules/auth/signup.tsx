"use client";

import UserRepository from "@/repository/userRepository";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLoading } from "react-icons/ai";
import ErrorService from "@/services/errorService";
import CookieManager from "@/manager/cookieManager";
import AuthValidation from "@/validations/authValidations";
import { AuthProps } from "@/types";

const defaultValues = {
  phone: "",
  password: "",
  firstName: "",
  lastName: "",
  confirmPassword: "",
};

const SignUpModule = () => {
  const mutation = useMutation({
    mutationFn: (data: any) => UserRepository.signup(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: ({ data }) => {
      CookieManager.save("_tp_access_token", data?.data?.accessToken);
      window.location.replace("/verification");
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
              validationSchema={AuthValidation.signup}
              onSubmit={(value) => submit(value as AuthProps)}
              className="w-full"
            >
              {({ errors, touched }) => {
                return (
                  <Form className="w-full">
                    <h1 className="text-2xl font-bold mb-6 text-center border-b-4 border-b-[#53A4F5] border-solid max-w-fit">
                      Register
                    </h1>
                    <h3 className="text-4xl font-bold mb-16 ">Create New Account</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="col-span-2 md:col-span-1">
                        <label htmlFor="name" className="block mb-2 font-medium">
                          First Name
                        </label>
                        <Field
                          name="firstName"
                          type="text"
                          className="block w-full px-4 py-4 rounded-md shadow-sm bg-white border-0 focus:outline-none focus:border-[#00a3f5]"
                        />
                        {touched.firstName && errors.firstName ? (
                          <div className="text-red-500 text-sm ml-3">{errors.firstName}</div>
                        ) : null}
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label htmlFor="name" className="block mb-2 font-medium">
                          Last Name
                        </label>
                        <Field
                          name="lastName"
                          type="text"
                          className="block w-full px-4 py-4 rounded-md shadow-sm bg-white border-0 focus:outline-none focus:border-[#00a3f5]"
                        />
                        {touched.lastName && errors.lastName ? (
                          <div className="text-red-500 text-sm ml-3">{errors.lastName}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block mb-2 font-medium">
                        Phone Number
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
                    <div className="mb-4">
                      <label htmlFor="password" className="block mb-2 font-medium">
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className="block w-full px-4 py-4 rounded-md shadow-sm bg-white border-0 focus:outline-none focus:border-[#00a3f5]"
                      />
                      {touched.password && errors.password ? (
                        <div className="text-red-500 text-sm ml-3">{errors.password}</div>
                      ) : null}
                    </div>
                    <div className="mb-8">
                      <label htmlFor="password" className="block mb-2 font-medium">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="block w-full px-4 py-4 rounded-md shadow-sm bg-white border-0 focus:outline-none focus:border-[#00a3f5]"
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <div className="text-red-500 text-sm ml-3">{errors.confirmPassword}</div>
                      ) : null}
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="p-3 w-full flex justify-center items-center px-5 rounded-md bg-[#00a3f5] text-white font-medium"
                      >
                        {mutation.isPending ? <AiOutlineLoading className="mr-2 h-6 w-6 animate-spin" /> : null}
                        SIGN UP
                      </button>
                      <p className="mt-5 text-center">
                        Aready Have An Account?{" "}
                        <Link href="/signin" className="text-[#00a3f5] font-medium">
                          Sign In
                        </Link>
                      </p>
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

export default SignUpModule;
