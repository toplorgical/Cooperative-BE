"use client";

import PrivateRoute from "@/components/private-route";
import pathnames from "@/constants/pathnames";
import employmentTypes from "@/data/employment-types";
import UserRepository from "@/repository/userRepository";
import ErrorService from "@/services/errorService";
import { UserProps } from "@/types";
import UserValidations from "@/validations/userValidations";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaArrowRight, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";

const defaultValues = {
  companyName: "",
  jobTitle: "",
  employmentStartDate: "",
  employmentType: "",
  employmentLocation: "",
} as UserProps;

const WorkInfoModule = () => {
  const mutation = useMutation({
    mutationFn: (data: UserProps) => UserRepository.addWorkInfo(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: ({ data }) => {
      toast.success("Work info updated successfully...");
      window.location.replace(pathnames.USER_DASHBOARD);
    },
  });

  function submit(data: UserProps) {
    mutation.mutate(data);
  }
  return (
    <PrivateRoute>
      <div className="container mx-auto border-r-4 border-r-[#53A4F5] min-h-screen">
        <div className="mx-auto max-w-[700px]">
          <div className="flex gap-4 items-center py-7 border-b">
            <div className="text-gray-400 text-sm font-medium">PERSONAL INFO</div>
            <FaChevronRight className="text-gray-400" size={12} />
            <div className="text-[#53A4F5] text-sm font-bold">WORK INFO</div>
          </div>
          <div className="py-7">
            <div className="font-bold text-3xl mb-7">2. Work Information</div>
            <div className="font-bold text-xl text-gray-300 mb-4">About you</div>
            <Formik
              enableReinitialize
              initialValues={defaultValues}
              validationSchema={UserValidations.workSetup}
              onSubmit={(value) => submit(value)}
              className="w-full"
            >
              {({ errors, touched, values }) => {
                const state = values.state;
                return (
                  <Form className="w-full">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 md:col-span-1">
                        <div className="mb-4">
                          <label htmlFor="companyName" className="block mb-2 font-medium">
                            Company Name *
                          </label>
                          <Field
                            id="companyName"
                            name="companyName"
                            type="text"
                            className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5]"
                          />
                          {touched.companyName && errors.companyName ? (
                            <div className="text-red-500 text-sm ml-3">{errors.companyName}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <div className="mb-4">
                          <label htmlFor="jobTitle" className="block mb-2 font-medium">
                            Job Title *
                          </label>
                          <Field
                            id="jobTitle"
                            name="jobTitle"
                            type="text"
                            className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5]"
                          />
                          {touched.jobTitle && errors.jobTitle ? (
                            <div className="text-red-500 text-sm ml-3">{errors.jobTitle}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 md:col-span-1">
                        <div className="mb-4">
                          <label htmlFor="employmentStartDate" className="block mb-2 font-medium">
                            Employment Start Date *
                          </label>
                          <Field
                            id="employmentStartDate"
                            name="employmentStartDate"
                            type="date"
                            className="bg-white block w-full px-3 py-2 rounded-md shadow-sm border-gray-300 focus:outline-none focus:border-[#00a3f5]"
                          />
                          {touched.employmentStartDate && errors.employmentStartDate ? (
                            <div className="text-red-500 text-sm ml-3">{errors.employmentStartDate}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <div className="mb-4">
                          <label htmlFor="employmentType" className="block mb-2 font-medium">
                            Employment Type *
                          </label>
                          <Field
                            id="employmentType"
                            as="select"
                            name="employmentType"
                            className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5]"
                          >
                            <option value="">-- Employment Type --</option>
                            {employmentTypes.map((item: string) => (
                              <option value={item} key={item}>
                                {item}
                              </option>
                            ))}
                          </Field>
                          {touched.employmentType && errors.employmentType ? (
                            <div className="text-red-500 text-sm ml-3">{errors.employmentType}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label htmlFor="employmentLocation" className="block mb-2 font-medium">
                        Employment Location *
                      </label>
                      <Field
                        id="employmentLocation"
                        name="employmentLocation"
                        type="text"
                        className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5]"
                      />
                      {touched.employmentLocation && errors.employmentLocation ? (
                        <div className="text-red-500 text-sm ml-3">{errors.employmentLocation}</div>
                      ) : null}
                    </div>

                    <div className="flex justify-end mb-10">
                      <button
                        type="submit"
                        className="py-2 px-5 flex justify-between gap-5 items-center rounded-full bg-[#00a3f5] text-white font-medium"
                      >
                        <span className="text-sm">NEXT</span>
                        {mutation.isPending ? (
                          <AiOutlineLoading className="h-4 w-4 animate-spin" />
                        ) : (
                          <FaArrowRight className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default WorkInfoModule;
