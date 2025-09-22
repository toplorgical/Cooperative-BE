"use client";

import React from "react";
import { Field, Form, Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { AiOutlineLoading } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import AdminRepository from "@/repository/adminRepository";
import AuthValidation from "@/validations/authValidations";
import ErrorService from "@/services/errorService";
import { AuthProps } from "@/types";

const defaultValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
};

const CreateAdminModule = () => {
  const mutation = useMutation({
    mutationFn: (data: AuthProps) => AdminRepository.createAdmin(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: () => {
      alert("Admin account created successfully!");
      window.location.href = "/admin/users";
    },
  });

  function submit(data: AuthProps) {
    mutation.mutate(data);
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Link
          href="/admin/users"
          className="mr-4 p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <MdArrowBack className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Admin Account</h1>
      </div>

      <div className="max-w-md">
        <Formik
          initialValues={defaultValues}
          validationSchema={AuthValidation.adminSignup}
          onSubmit={(value) => submit(value as AuthProps)}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {touched.phone && errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Security Note:</strong> The new admin will need to verify their account and 
                      should change their password after first login.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {mutation.isPending && <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />}
                  Create Admin Account
                </button>

                <Link
                  href="/admin/users"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAdminModule;