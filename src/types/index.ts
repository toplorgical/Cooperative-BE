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
  registrationStatus: string;
  companyName: string;
  jobTitle: string;
  employmentStartDate: string;
  employmentType: string;
  employmentLocation: string;

  documents: {
    title: string;
    url: string;
    description: string;
  }[];
  profileSetup: "personal-details" | "employment-details" | "completed";
  isActive: boolean;
  isBanned: boolean;
  isDeleted: boolean;
  updatedAt: string;
  createdAt: string;
};

export interface UserQueryProps extends UserProps {
  keyword: string;
  page: string;
  limit: string;
}

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

export type ChangePasswordProps = {
  password: string;
  newPassword: string;
};
