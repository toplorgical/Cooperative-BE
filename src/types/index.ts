import { number } from "joi";
import { FLOAT } from "sequelize";
import { DecimalDataType } from "sequelize";

export type UserProps = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  email: string;
  publicId: string;
  isVerified: boolean | number;
  rememberMe: boolean;
  token: string;
  userAgent?: string;
  nationality: string;
  address: string;
  lga: string;
  state: string;
  postalCode: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  contactAddress: string;
  registrationStatus: "PENDING" | "APPROVED" | "REJECTED";
  companyName: string;
  jobTitle: string;
  employmentStartDate: string;
  employmentType: string;
  employmentLocation: string;
  balance: number;

  documents: {
    title: string;
    url: string;
    description: string;
  }[];
  profileSetup: "PERSONAL_INFO" | "WORK_INFO" | "COMPLETED";
  isActive: boolean;
  isBanned: boolean;
  isDeleted: boolean;
  updatedAt: string;
  createdAt: string;

  loans:LoanProps[]
};

export interface UserQueryProps extends UserProps {
  keyword: string;
  page: string;
  limit: string;
}

export interface CalculatorTypeProps {
  rate :number,
  amount : number,
  duration : number
}

export type LoanTypeProps={
  id: number;
  rate: number;
  name: string;
};

export type VerificationProps = {
  id: number;
  code: string;
  userId: number;
  expiresAt: string;
};

export type ResetPasswordProps = {
  code: string;
  token: string;
  password: string;
};

export type LoanProps = {
  amountPaid : number
  totalAmountToBePaid :number,
  interest : number,
  id: number;
  amount: number;
  userId: number;
  disbursedAt: string;
  approvedAt: string;
  loanId: number;
  duration: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
  loanTypeId : number
};
export type LoanPaymentProps = {
  id: number;
  loanId: number;
  amount: number;
  status: "PENDING" | "COMPLETED";
};

export interface LoanPaymentQueryProps extends LoanPaymentProps {
  page: string;
  limit: string;
}

export interface LoanQueryProps extends LoanProps {
  keyword: string;
  page: string;
  limit: string;
}
