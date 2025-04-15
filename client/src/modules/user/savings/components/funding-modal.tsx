import { UserContext } from "@/context/user-context";
import { PaystackProps } from "@/types";
import UserValidations from "@/validations/userValidations";
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { PaystackButton } from "react-paystack";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FundingProps = { amount: string | number };
const initialValues = { amount: "" } as FundingProps;

const FundingModal = ({ isOpen, onClose }: ModalProps) => {
  const { user } = React.useContext(UserContext);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UserValidations.paystackAmount,
    onSubmit: (data) => handleSubmit(data),
  });

  function handleSubmit(data: FundingProps) {}

  const amount = Number(formik.values?.amount || 0);
  const isValidAmount = amount >= 5000 && amount <= 1000000;
  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <Modal.Header>Fund Account</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <label htmlFor="" className="font-semibold">
              Amount: *
            </label>
            <CurrencyInput
              decimalsLimit={2}
              type="text"
              id="amount"
              placeholder="Please Enter Amount"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              onValueChange={(value) => formik.setFieldValue("amount", value as string)}
            />
            {formik.errors?.amount && <p className="text-red-500 text-sm mt-2">{formik.errors?.amount}</p>}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end gap-5">
        <button
          onClick={onClose}
          className="py-2 px-5 flex justify-center gap-5 items-center rounded-full border border-gray-300 text-gray-800 text-sm font-medium"
        >
          Close
        </button>
        <button
          disabled={!isValidAmount}
          className={`py-2 px-5 flex justify-center gap-5 items-center rounded-full font-medium ${
            isValidAmount ? "bg-[#00a3f5] text-white" : "bg-gray-300 text-gray-400"
          }`}
        >
          {formik?.values?.amount ? <PaystackButton {...constructPaymentData()} /> : "Fund Now"}
        </button>
      </Modal.Footer>
    </Modal>
  );

  function constructPaymentData() {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_API_KEY;
    const paymentData: PaystackProps = {
      email: user?.email || "",
      amount: Number(formik.values.amount) * 100,
      metadata: {
        name: `${user?.firstName} ${user?.lastName}`,
        phone: user?.phone,
      },
      publicKey,
      text: "Fund Now",
      onSuccess: () => window.location.replace("/success"),
      onClose: () => alert("Wait! Don't leave :"),
    };
    return paymentData;
  }
};

export default FundingModal;
