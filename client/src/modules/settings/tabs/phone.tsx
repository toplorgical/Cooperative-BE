"use client";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { Field, Form, Formik } from "formik";
import AuthValidation from "@/validations/authValidations";
import { AuthProps, UserProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import SettingRepository from "@/repository/settingRepository";
import ErrorService from "@/services/errorService";
import { toast } from "react-toastify";
import pathnames from "@/constants/pathnames";

let defaultValues = { phone: "" } as AuthProps;

const PhoneTab = ({ user }: { user: UserProps }) => {
  const mutation = useMutation({
    mutationFn: (data: AuthProps) => SettingRepository.UpdatePhoneNumber(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: ({ data }) => {
      toast.success("Phone number updated successfull...");
      window.location.replace(pathnames.VERIFICATION);
    },
  });

  if (user) defaultValues = { phone: user.phone } as AuthProps;

  function submit(data: AuthProps) {
    mutation.mutate(data);
  }

  return (
    <div className="mx-auto max-w-[700px]">
      <div className="flex gap-4 items-center py-7 border-b">
        <div className="text-[#53A4F5] text-sm font-bold">CHANGE PHONE NUMBER</div>
        <FaChevronRight className="text-gray-400" size={12} />
      </div>
      <div className="py-7 flex justify-center">
        <Formik
          enableReinitialize
          initialValues={defaultValues}
          validationSchema={AuthValidation.phone}
          onSubmit={(value) => submit(value)}
          className="w-full"
        >
          {({ errors, touched }) => {
            return (
              <Form className="w-full">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <div className="mb-4">
                      <label htmlFor="email" className="block mb-2 font-medium">
                        Phone Number
                      </label>
                      <Field
                        id="phone"
                        name="phone"
                        type="text"
                        className="block md:w-[400px] sm:w-[400px] px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                      />
                      {touched.phone && errors.phone ? (
                        <div className="text-red-500 text-sm ml-3">{errors.phone}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className=" mb-4">
                  <button
                    type="submit"
                    className="py-2 mt-5 h-[4px]-5 md:w-[400px] sm:w-[400px] flex justify-center gap-5 items-center rounded-full bg-[#00a3f5] text-white font-medium"
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
  );
};

export default PhoneTab;
