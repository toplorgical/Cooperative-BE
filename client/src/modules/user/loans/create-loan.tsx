"use client";

import AppLayout from "@/components/app-layout";
import PrivateRoute from "@/components/private-route";
import pathnames from "@/constants/pathnames";
import LoanRepository from "@/repository/loanRepository";
import ErrorService from "@/services/errorService";
import { LoanProps, LoanQueryProps, LoansResultProps, LoanTypeProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import LoanValidation from "@/validations/loanValidations";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { AiOutlineLoading } from "react-icons/ai";
import { RxInfoCircled } from "react-icons/rx";
import { toast } from "react-toastify";
import EligibilityModal from "./components/eligibility-modal";
import { UserContext } from "@/context/user-context";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import FeedbackModal from "@/components/feedback-modal";

const defaultValues = {
  amount: "",
  loanTypeId: "",
  duration: "12",
  rate: "",
  guarantors: [{ registrationId: "" }, { registrationId: "" }],
} as LoanProps;

const initialFeedback = { isOpen: false, message: "" };
const CreateLoanModule = () => {
  const router = useRouter();
  const { user } = React.useContext(UserContext);
  const [isEligible, setIsEligible] = React.useState(false);
  const [feedback, setFeedback] = React.useState(initialFeedback);

  const mutation = useMutation({
    mutationFn: (data: LoanProps) => LoanRepository.create(data),
    onError: (error) => ErrorService.handler(error, setFeedback),
    onSuccess: ({ data }) => {
      router.push(pathnames.LOANS + "?id=" + data?.data?.id);
      toast.success("Loan request submitted successfully...");
    },
  });

  const loansQuery = useQuery({
    queryKey: ["loans"],
    queryFn: () => LoanRepository.find({ status: "APPROVED" } as LoanQueryProps),
  });

  function submit(data: LoanProps) {
    const { rate, ...rest } = data;
    mutation.mutate(rest as LoanProps);
  }

  const loansTypesQuery = useQuery({
    queryKey: ["loans-types"],
    queryFn: () => LoanRepository.getLoanTypes(),
  });

  const loansTypesResult = loansTypesQuery?.data?.data?.data as { data: LoanTypeProps[] };
  const loansResult = loansQuery?.data?.data?.data as LoansResultProps;

  const total = loansResult?.data?.reduce((a, c) => a + c.totalRepayments, 0);
  const balance = Number(user?.account?.balance || 0) - total;

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="flex-1">
          <div className="rounded-xl bg-white shadow p-6 overflow-x-auto">
            <div className="flex justify-between flex-wrap gap-4 items-center">
              <div className="text-2xl font-medium mb-6">Apply for Loan</div>
            </div>

            <Formik
              enableReinitialize
              initialValues={defaultValues}
              validationSchema={LoanValidation.create}
              onSubmit={(value) => submit(value)}
              className="w-full"
            >
              {({ errors, touched, values, setFieldValue }) => {
                const loanTypeId = values.loanTypeId;
                const interestRate = loansTypesResult?.data.find((item) => item.id === Number(loanTypeId))?.rate;
                const result = calculateLoan({ ...values, rate: Number(interestRate) });

                const isEligibleForLoan = balance * 3 >= Number(result.totalRepayments);

                return (
                  <Form className="w-full">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="col-span-2 lg:col-span-1">
                        <div className="mb-4">
                          <label className="block mb-2 font-medium">Amount *</label>
                          <CurrencyInput
                            decimalsLimit={2}
                            value={values.amount}
                            placeholder="Please enter amount"
                            onValueChange={(value) => setFieldValue("amount", value)}
                            className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5]"
                          />

                          {touched.amount && errors.amount ? (
                            <div className="text-red-500 text-sm ml-3">{errors.amount}</div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 font-medium">Loan Type *</label>
                          <Field
                            as="select"
                            name="loanTypeId"
                            className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5]"
                          >
                            <option value="">-- Loan Type --</option>
                            {loansTypesResult?.data.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </Field>
                          {touched.loanTypeId && errors.loanTypeId ? (
                            <div className="text-red-500 text-sm ml-3">{errors.loanTypeId}</div>
                          ) : null}
                        </div>

                        <div className="mb-4">
                          <label className="block mb-2 font-medium">Duration (in months) *</label>
                          <Field
                            type="number"
                            name="duration"
                            max={120}
                            placeholder="Please enter a duration"
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                              if (e.key === ".") e.preventDefault();
                            }}
                            className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5]"
                          />
                          {touched.duration && errors.duration ? (
                            <div className="text-red-500 text-sm ml-3">{errors.duration}</div>
                          ) : null}
                        </div>
                        <div className="mb-8">
                          <label className="block mb-2 font-medium">Interest rate per year (%)</label>
                          <Field
                            disabled
                            type="number"
                            name="interest"
                            value={interestRate}
                            className="block w-full px-3 py-2 rounded-md shadow-sm bg-gray-200 border-gray-300 focus:outline-none focus:border-[#00a3f5]"
                          />
                        </div>

                        <div className="text-xl font-semibold mb-3">Guarantors</div>
                        <FieldArray name="guarantors">
                          {({ insert, remove, push }) => (
                            <div className="mb-8">
                              {defaultValues.guarantors?.map((_, index) => (
                                <div className="mb-4" key={index}>
                                  <label className="block mb-2 font-medium">Guarantor ({index + 1}) *</label>
                                  <Field
                                    type="text"
                                    placeholder="Enter guarantor's membership ID"
                                    name={`guarantors.${index}.registrationId`}
                                    className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5]"
                                  />
                                  <ErrorMessage
                                    name={`guarantors.${index}.registrationId`}
                                    component="div"
                                    className="text-red-500 text-sm ml-3"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                        {isEligibleForLoan ? null : (
                          <Alert color="failure" icon={HiInformationCircle} className="mb-8">
                            You are not eligible for a loan at this time. Your account balance is insufficient to meet
                            the required eligibility criteria.
                          </Alert>
                        )}
                        <div className="flex justify-end mb-10">
                          <button
                            type="submit"
                            disabled={!isEligibleForLoan}
                            className={`py-2 px-5 w-full flex justify-center gap-5 items-center rounded-full font-medium ${
                              isEligibleForLoan ? "bg-[#00a3f5] text-white" : "bg-gray-300 text-gray-500"
                            }`}
                          >
                            {mutation.isPending ? <AiOutlineLoading className="h-4 w-4 animate-spin" /> : null}
                            <span className="text-sm">SUBMIT</span>
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 lg:col-span-1">
                        <div className="shadow p-4 h-full">
                          <div className="flex gap-3 mb-5">
                            <span>
                              <RxInfoCircled className="w-6 h-6" />
                            </span>
                            <span>
                              This calculator is for illustrative purposes only, to give you, the borrower, an overview
                              of the potential cost of borrowing.
                            </span>
                          </div>
                          <div>
                            <div className="mb-10">
                              <div className="text-center">Account Balance</div>
                              <div className="text-center text-3xl font-bold">{currencyFormat(balance)}</div>
                            </div>
                            <div className="flex justify-between items-center mb-5">
                              <div>Monthly payments</div>
                              <div>{currencyFormat(result?.monthlyRepayment)}</div>
                            </div>
                            <div className="flex justify-between items-center mb-5">
                              <div>Total principal</div>
                              <div>{currencyFormat(result?.principal)}</div>
                            </div>
                            <div className="flex justify-between items-center mb-5">
                              <div>Total interest</div>
                              <div>{currencyFormat(result?.totalInterest)}</div>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center my-5">
                              <div>Total payment</div>
                              <div>{currencyFormat(result?.totalRepayments)}</div>
                            </div>
                            <div className="flex justify-between items-center mb-5">
                              <div>Monthly payments</div>
                              <div>{currencyFormat(result?.monthlyRepayment)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>

          <EligibilityModal isOpen={isEligible} onClose={() => setIsEligible(false)} />
          <FeedbackModal
            isOpen={feedback.isOpen}
            title="Message"
            description={feedback.message}
            onClose={() => setFeedback(initialFeedback)}
          />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
};

function calculateLoan(loan: LoanProps) {
  const principal = Number(loan?.amount || 0);
  const annualInterestRate = Number(loan?.rate || 0);
  const loanDurationMonths = Number(loan?.duration || 0);
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  const monthlyRepayment =
    (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanDurationMonths)) || 0;

  const totalRepayments = monthlyRepayment * loanDurationMonths;
  const totalInterest = totalRepayments - principal;

  return { principal, monthlyRepayment, totalRepayments, totalInterest };
}

export default CreateLoanModule;
