"use client";

import UserRepository from "@/repository/userRepository";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import AuthValidation from "@/validations/authValidations";
import Link from "next/link";
import ErrorService from "@/services/errorService";
import { AuthProps } from "@/types";
import { AiOutlineLoading } from "react-icons/ai";
import CookieManager from "@/manager/cookieManager";
import pathnames from "@/constants/pathnames";

const defaultValues = {
  phone: "",
  password: "",
  rememberMe: false,
};

const SignInModule = () => {
  const mutation = useMutation({
    mutationFn: (data: AuthProps) => UserRepository.signin(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: ({ data }) => {
      CookieManager.save("_tp_access_token", data?.data?.accessToken);
      window.location.replace(pathnames.USER_DASHBOARD);
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
              validationSchema={AuthValidation.signin}
              onSubmit={(value) => submit(value as AuthProps)}
              className="w-full"
            >
              {({ errors, touched }) => {
                return (
                  <Form className="w-full">
                    <h1 className="text-2xl font-bold mb-6 text-center border-b-4 border-b-[#53A4F5] border-solid max-w-fit">
                      Sign In
                    </h1>
                    <h3 className="text-4xl font-bold mb-16 ">Welcome Back!</h3>
                    <div className="mb-4">
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
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-gray-700">
                        Password *
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
                    <div className="mb-6 flex items-center justify-between">
                      <label className="inline-flex items-center">
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          className="form-checkbox text-[#00a3f5] rounded-sm focus:ring-[#00a3f5] cursor-pointer"
                        />
                        <span className="ml-2 text-gray-700">Remember Me</span>
                      </label>
                      <Link href="/forgot-password" className="text-[#00a3f5] font-medium">
                        Forgot Password?
                      </Link>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="p-3 w-full flex justify-center items-center px-5 rounded-md bg-[#00a3f5] text-white font-medium"
                      >
                        {mutation.isPending ? <AiOutlineLoading className="mr-2 h-6 w-6 animate-spin" /> : null}
                        SIGN IN
                      </button>
                      <p className="mt-5 text-center">
                        Don&apos;t Have An Account?{" "}
                        <Link href="/signup" className="text-[#00a3f5] font-medium">
                          Create an Account
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

export default SignInModule;
