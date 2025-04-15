export type UserProps = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  email: string;
  publicId: string;
  isVerified: boolean | number | string;
  rememberMe: boolean;
  registrationId: string;
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
  role: "USER" | "ADMIN" | "SUPER_ADMIN";

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
  account: AccountProps;
};

export interface UserQueryProps extends UserProps {
  keyword: string;
  page: string;
  limit: string;
}

export interface CalculatorTypeProps {
  rate: number;
  amount: number;
  duration: number;
}

export type LoanTypeProps = {
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

export type LoanGuarantors = {
  loanId: number;
  loan: LoanProps;
  user: UserProps;
  userId: number;
  registrationId: string;
};

export type LoanProps = {
  totalInterest: number;
  monthlyRepayment: number;
  totalRepayments: number;
  rate: number | string;
  id: number | string;
  amount: number | string;
  userId: number | string;
  user: UserProps;
  disbursedAt: string | Date;
  approvedAt: string | Date;
  loanId: number;
  duration: number | string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
  loanTypeId: string;
  loanType: LoanTypeProps;
  createdAt: string;
  guarantors: LoanGuarantors[];
  data: [];
};

export interface LoanQueryProps extends LoanProps {
  keyword: string;
  page: string;
  limit: string;
  dateFrom: string;
  dateTo: string;
}
export interface UserQueryProps extends UserProps {
  keyword: string;
  page: string;
  limit: string;
  dateFrom: string;
  dateTo: string;
}

export interface TrxnQueryProps extends TransactionHistoryProps {
  keyword: string;
  page: string;
  limit: string;
  dateFrom: string;
  dateTo: string;
}

export type TransactionHistoryProps = {
  id: number;
  accountId: number;
  userId: number | string;
  date: string | Date;
  metadata: { [key: string]: any };
  description: string;
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
  amount: number;
  reference: string;
  createdAt: string;
  user: UserProps;
};

export type AccountProps = {
  id: number;
  accountNumber: number;
  balance: number;
  userId: number;
  createdAt: string;
};

export interface AuthProps {
  phone: string;
  token: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  code: string;
  rememberMe: boolean;
}

export interface SavingProps {
  id: number;
  transactionType: string;
  amount: number;
  status: string;
  date: string;
  description: string;
  data: [];
}

export interface LoansResultProps {
  page: number;
  totalPages: number;
  data: LoanProps[];
}

export interface UsersResultProps {
  page: number;
  totalPages: number;
  data: UserProps[];
}

export interface TxnsResultProps {
  page: number;
  totalPages: number;
  data: TransactionHistoryProps[];
  isPending: boolean;
}

export interface savingDataProps {
  SavingProps: [];
}

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export type PaystackProps = {
  email: string;
  name?: string;
  amount: number;
  phone?: string;
  publicKey: any;
  text: string;
  metadata?: any;
  onSuccess: any;
  onClose: any;
};

export interface SavingResultProps {
  page: number;
  totalPages: number;
  data: LoanProps[];
}

export interface SavingQueryProps {
  keyword: string;
  page: string;
  limit: number;
  dateFrom: string;
  dateTo: string;
}

export interface SecurityProps {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface User {
  isVerified: boolean;
  count: string;
}

interface Loan {
  status: string;
  count: string;
}

interface AdminAnalyticsDataProps {
  users: User[];
  loans: Loan[];
  savings: number;
}

export interface TransactionProps {
  id: number;
  date: string;
  type: string;
  description: string;
  amount: number;
  user: UserProps;
  createdAt: string;
}

export interface MessageProps {
  id: number | string;
  from: number;
  to: number;
  title: string;
  description: string;
  status: "READ" | "UNREAD";
  createdAt: string;
  data: LoanProps;
  metadata: { type: "loan"; data: LoanProps };
  user: UserProps;
  loanMessageId: string | number;
  monthlyRepayment: number;
}

export interface messageQueryProps extends MessageProps {
  id: string | number;
  userId: string | number;
}
