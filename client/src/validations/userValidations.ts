import * as Yup from "yup";

class UserValidations {
  static profileSetup = Yup.object({
    email: Yup.string().email().label("Email"),
    nationality: Yup.string().required().label("Nationality"),
    country: Yup.string().required().oneOf(["Nigeria"]).label("Country"),
    state: Yup.string().required().label("State"),
    lga: Yup.string().required().label("LGA"),
    contactAddress: Yup.string().required().label("Address"),
    postalCode: Yup.string().label("Postal Code"),
    dateOfBirth: Yup.date().required().label("Date of Birth"),
    gender: Yup.string().required().label("Gender"),
  });

  static paystackAmount = Yup.object().shape({
    amount: Yup.number()
      .positive("Amount must be positive")
      .min(5000, "Amount must be greater than or equal to 5000")
      .max(1000000, "Amount must be less than or equal to 1,000,000")
      .required("Amount is required"),
  });

  static workSetup = Yup.object({
    companyName: Yup.string().required().label("Company Name"),
    jobTitle: Yup.string().required().label("Job Title"),
    employmentStartDate: Yup.date().required().label("Employment State Date"),
    employmentType: Yup.string().required().label("Employment Type"),
    employmentLocation: Yup.string().required().label("Employment Location"),
  });

  static paystackAmoutValidation = Yup.object({
    amount: Yup.number().min(5000).max(1000000).required().label("Amount"),
  });
}

export default UserValidations;
