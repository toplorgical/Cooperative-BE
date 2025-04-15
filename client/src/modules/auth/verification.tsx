"use client";

import React from "react";
import { Form, Formik } from "formik";
import AuthValidation from "@/validations/authValidations";
import Image from "next/image";
import OTPInput from "react-otp-input";
import { useMutation } from "@tanstack/react-query";
import { AuthProps } from "@/types";
import UserRepository from "@/repository/userRepository";
import ErrorService from "@/services/errorService";
import { toast } from "react-toastify";
import pathnames from "@/constants/pathnames";
import { AiOutlineLoading } from "react-icons/ai";
import { UserContext } from "@/context/user-context";

const defaultValues = { code: "" };

const VerificationModule = () => {
  const { user } = React.useContext(UserContext);

  const mutation = useMutation({
    mutationFn: (data: AuthProps) => UserRepository.verifyOTP(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: () => {
      toast.success("Account verified successfully...");
      if (user?.profileSetup === "COMPLETED") window.location.replace(pathnames.USER_DASHBOARD);
      else window.location.replace(pathnames.SETUP_PERSONAL_INFO);
    },
  });

  async function requestOTP() {
    try {
      await UserRepository.requestOTP();
      toast.success("We've sent a verification code to your phone number");
    } catch (error) {
      ErrorService.handler(error);
    }
  }

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
              validationSchema={AuthValidation.verification}
              onSubmit={(value) => submit(value as AuthProps)}
              className="w-full"
            >
              {({ errors, values, setFieldValue }) => {
                return (
                  <Form className="w-full">
                    <h1 className="text-2xl font-bold mb-6 text-center border-b-4 border-b-[#53A4F5] border-solid max-w-fit">
                      Account Verification
                    </h1>
                    <p className=" mb-16 ">
                      Enter the verification code sent to your phone number to verify your account.
                    </p>
                    <div className="mb-8">
                      <label className="block mb-2 font-medium">Verification Code</label>
                      <OTPInput
                        numInputs={6}
                        inputType="tel"
                        value={values.code}
                        renderSeparator={<span></span>}
                        onChange={(value) => setFieldValue("code", value)}
                        containerStyle={{ display: "flex", gap: 16, justifyContent: "center" }}
                        renderInput={(props) => <input {...props} className="otp-input" />}
                      />
                      {errors.code ? <div className="text-red-500 text-sm ml-3">{errors.code}</div> : null}
                    </div>
                    <div className="mb-4">
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="p-3 w-full flex justify-center items-center px-5 rounded-md bg-[#00a3f5] text-white font-medium"
                      >
                        {mutation.isPending ? <AiOutlineLoading className="mr-2 h-6 w-6 animate-spin" /> : null}
                        SUBMIT
                      </button>
                    </div>

                    <div className="text-center">
                      <div className="mb-3">
                        <span>Didn&apos;t get a code? </span>
                        <span
                          role="button"
                          tabIndex={1}
                          onClick={requestOTP}
                          className="font-medium text-[#00a3f5] focus:border-black focus:border-2 rounded-md"
                        >
                          Click to resend
                        </span>
                      </div>
                      <div>If you still need help, contact Fresible Support</div>
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

export default VerificationModule;
