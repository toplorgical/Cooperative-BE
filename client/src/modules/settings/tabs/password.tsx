"use client";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Field, Form, Formik } from "formik";
import { SecurityProps } from "@/types";
import ErrorService from "@/services/errorService";
import { toast } from "react-toastify";
import AuthValidation from "@/validations/authValidations";
import { AiOutlineLoading } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";
import SettingRepository from "@/repository/settingRepository";
import { useRouter } from "next/navigation";
import pathnames from "@/constants/pathnames";

const defaultValues = {
  password: "",
  confirmPassword: "",
  newPassword: "",
};

const SecurityTab = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: SecurityProps) => SettingRepository.UpdateSecurity(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: () => {
      toast.success("Password reset successfully");
      router.push(pathnames.USER_DASHBOARD);
    },
  });

  function submit(data: SecurityProps) {
    mutation.mutate(data);
  }

  return (
    <div className="container mx-auto border-r-4 border-r-[#53A4F5] min-h-screen">
      <div className="mx-auto max-w-[700px]">
        <div className="flex gap-4 items-center py-7 border-b">
          <div className="text-[#53A4F5] text-sm font-bold">SECURITY</div>
          <FaChevronRight className="text-gray-400" size={12} />
          <div className="text-gray-400 text-sm font-medium">CHANGE PHONE NUMBER</div>
        </div>
        <div className="py-7">
          <Formik
            enableReinitialize
            initialValues={defaultValues}
            validationSchema={AuthValidation.changePassword}
            onSubmit={(value) => submit(value)}
            className="w-full"
          >
            {({ errors, touched, values }) => {
              return (
                <Form className="w-full">
                  <div className="mb-4">
                    <label htmlFor="oldPassword" className="block mb-2 font-medium">
                      Old Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="block md:w-[400px] sm:w-[400px] px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                    />
                    {touched.password && errors.password ? (
                      <div className="text-red-500 text-sm ml-3">{errors.password}</div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium">
                      New Password
                    </label>
                    <Field
                      id="password"
                      name="newPassword"
                      type="password"
                      className="block md:w-[400px] sm:w-[400px] px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                    />
                    {touched.newPassword && errors.newPassword ? (
                      <div className="text-red-500 text-sm ml-3">{errors.newPassword}</div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                      Comfirm Password *
                    </label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="block md:w-[400px] sm:w-[400px] px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                    />
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <div className="text-red-500 text-sm ml-3">{errors.confirmPassword}</div>
                    ) : null}
                  </div>

                  <div className="  mb-10">
                    <button
                      type="submit"
                      className="py-2 px-5 flex justify-center md:w-[400px] sm:w-[400px] gap-5 items-center rounded-full bg-[#00a3f5] text-white font-medium"
                    >
                      <span className="text-sm">Update</span>
                      {mutation.isPending ? <AiOutlineLoading className="h-4 w-4 animate-spin" /> : null}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
