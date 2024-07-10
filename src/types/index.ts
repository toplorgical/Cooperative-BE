export type UserProps = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  email: string;
  isVerified: boolean | number;
  rememberMe: boolean;
  token: string;
  userAgent?: string;
  personalDetails: {
    address: string;
    city: string;
    state: string;
    postCode: string;
    country: string;
    dateOfBirth: string;
    gender: string;
  };
  employmentDetails: {
    position: string;
    type: "full-time" | "contract";
  };
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
  id?: number;
  code: string;
  userId: number;
  expiresAt: Date;
  token? : string,
  password?: string,
};





