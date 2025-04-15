"use client";

import { UserContext } from "@/context/user-context";
import countries from "@/data/countries";
import SettingRepository from "@/repository/settingRepository";
import ErrorService from "@/services/errorService";
import { UserProps } from "@/types";
import UserValidations from "@/validations/userValidations";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import _ from "lodash";
const NaijaStates = require("naija-state-local-government");

let defaultValues = {
  email: "",
  nationality: "",
  country: "Nigeria",
  state: "",
  lga: "",
  contactAddress: "",
  postalCode: "",
  dateOfBirth: "",
  gender: "",
} as UserProps;

const states = NaijaStates.states() || [];
const getLgas = (state: string) => NaijaStates.lgas(state || "Abia").lgas || [];

const PersonalTab = () => {
  const { user } = React.useContext(UserContext);
  if (user) defaultValues = _.pick(user, [...Object.keys(defaultValues)]) as UserProps;

  const mutation = useMutation({
    mutationFn: (data: UserProps) => SettingRepository.UpdatePersonalInfo(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: ({ data }) => {
      toast.success("Personal info updated successfull...");
    },
  });

  function submit(data: UserProps) {
    mutation.mutate(data);
  }

  return (
    <div className="container mx-auto border-r-4 border-r-[#53A4F5] min-h-screen">
      <div className="mx-auto max-w-[700px]">
        <div className="flex gap-4 items-center py-7 border-b">
          <div className="text-[#53A4F5] text-sm font-bold">PERSONAL INFO</div>
          <FaChevronRight className="text-gray-400" size={12} />
          <div className="text-gray-400 text-sm font-medium">WORK INFO</div>
        </div>
        <div className="py-7">
          <Formik
            enableReinitialize
            initialValues={defaultValues}
            validationSchema={UserValidations.profileSetup}
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
                        <label htmlFor="email" className="block mb-2 font-medium">
                          Email
                        </label>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                        />
                        {touched.email && errors.email ? (
                          <div className="text-red-500 text-sm ml-3">{errors.email}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <label htmlFor="nationality" className="block mb-2 font-medium">
                          Nationality *
                        </label>
                        <Field
                          id="nationality"
                          as="select"
                          name="nationality"
                          className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                        >
                          <option value="">-- Nationality --</option>
                          {countries.map((item) => (
                            <option value={item.name} key={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </Field>
                        {touched.nationality && errors.nationality ? (
                          <div className="text-red-500 text-sm ml-3">{errors.nationality}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div className="mb-4">
                      <label htmlFor="contactAddress" className="block mb-2 font-medium">
                        Contact Address *
                      </label>
                      <Field
                        id="contactAddress"
                        name="contactAddress"
                        type="text"
                        className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                      />
                      {touched.contactAddress && errors.contactAddress ? (
                        <div className="text-red-500 text-sm ml-3">{errors.contactAddress}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <label htmlFor="country" className="block mb-2 font-medium">
                          Country *
                        </label>
                        <Field
                          disabled
                          id="country"
                          name="country"
                          type="text"
                          className="bg-gray-100 block w-full px-3 py-2 rounded-md shadow-sm border-gray-300 border-solid focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                        />
                        {touched.country && errors.country ? (
                          <div className="text-red-500 text-sm ml-3">{errors.country}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <label htmlFor="state" className="block mb-2 font-medium">
                          State *
                        </label>
                        <Field
                          value={user?.state}
                          id="state"
                          as="select"
                          name="state"
                          className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                        >
                          <option value="">-- State --</option>
                          {states.map((item: string) => (
                            <option value={item} key={item}>
                              {item}
                            </option>
                          ))}
                        </Field>
                        {touched.state && errors.state ? (
                          <div className="text-red-500 text-sm ml-3">{errors.state}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <label htmlFor="lga" className="block mb-2 font-medium">
                          Local Government Area *
                        </label>
                        <Field
                          id="lga"
                          as="select"
                          name="lga"
                          className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                        >
                          <option value="">-- Local govt --</option>
                          {getLgas(state).map((item: string) => (
                            <option value={item} key={item}>
                              {item}
                            </option>
                          ))}
                        </Field>
                        {touched.lga && errors.lga ? (
                          <div className="text-red-500 text-sm ml-3">{errors.lga}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <label htmlFor="postalCode" className="block mb-2 font-medium">
                          Postal Code
                        </label>
                        <Field
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          className="bg-white block w-full px-3 py-2 rounded-md shadow-sm border-gray-300 border-solid focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                        />
                        {touched.postalCode && errors.postalCode ? (
                          <div className="text-red-500 text-sm ml-3">{errors.postalCode}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <label htmlFor="gender" className="block mb-2 font-medium">
                          Gender *
                        </label>
                        <Field
                          id="gender"
                          as="select"
                          name="gender"
                          className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                        >
                          <option value="">-- Gender --</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Field>
                        {touched.gender && errors.gender ? (
                          <div className="text-red-500 text-sm ml-3">{errors.gender}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <label htmlFor="dateOfBirth" className="block mb-2 font-medium">
                          Date of Birth *
                        </label>
                        <Field
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          className="bg-white block w-full px-3 py-2 rounded-md shadow-sm border-gray-300 border-solid focus:outline-none focus:border-[#00a3f5] focus:border-solid"
                        />
                        {touched.dateOfBirth && errors.dateOfBirth ? (
                          <div className="text-red-500 text-sm ml-3">{errors.dateOfBirth}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mb-10 flex justify-end">
                    <button
                      type="submit"
                      className="py-2 px-5 min-w-fit flex justify-center gap-5 items-center rounded-full bg-[#00a3f5] text-white font-medium"
                    >
                      <span className="text-sm">Update personal info</span>
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

export default PersonalTab;
