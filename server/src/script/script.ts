import Account from "../models/account";
import AccountRepository from "../repository/account-repository";
import LoanRepository from "../repository/loan-repository";
import LoanTypeRepository from "../repository/loan-type-repository";
import UserRepository from "../repository/user-repository";
import { AccountProps, LoanTypeProps, UserProps } from "../types";
import { hashPassword } from "../utils";

class AppScript {
  static loanTypes = [
    { name: "Personal Loan", rate: 2.5 },
    { name: "Business Loan", rate: 7.5 },
    { name: "Mortgage Loan", rate: 4.3 },
  ] as LoanTypeProps[];
  static initialize() {
    AppScript.createDefaultAdmin();
    // AppScript.createLoanTypes();
    // AppScript.createAccount();
  }
  static async createLoanTypes() {
    const isExist = await LoanTypeRepository.findOne({});
    if (isExist) return;
    await LoanTypeRepository.bulkCreate(AppScript.loanTypes);
    console.log("LOAN TYPES: created successfully...");
  }

  static async createAccount() {
    const data = {} as AccountProps;
    data.userId = 1007897761;

    const result = await AccountRepository.create(data);
    console.log(result);
    console.log("ACCOUNT: created successfully...");
  }

  static async createDefaultAdmin() {
    try {
      // Get admin credentials from environment variables
      const adminPhone = process.env.DEFAULT_ADMIN_PHONE || "08012345678";
      const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@cooperative.com";
      const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "Admin123!";
      const adminFirstName = process.env.DEFAULT_ADMIN_FIRSTNAME || "Admin";
      const adminLastName = process.env.DEFAULT_ADMIN_LASTNAME || "User";

      // Check if default admin already exists
      const existingAdmin = await UserRepository.findOne({ 
        phone: adminPhone
      });
      
      if (existingAdmin) {
        console.log("DEFAULT ADMIN: already exists...");
        return;
      }

      // Create default admin user
      const adminData = {
        firstName: adminFirstName,
        lastName: adminLastName,
        phone: adminPhone,
        email: adminEmail,
        password: await hashPassword(adminPassword),
        role: "ADMIN",
        isVerified: true,
        profileSetup: "COMPLETED",
        registrationStatus: "APPROVED",
        nationality: "Nigerian",
        country: "Nigeria",
        state: "Lagos",
        lga: "Lagos Island",
        contactAddress: "System Generated Admin Account",
        gender: "Other",
        companyName: "System",
        jobTitle: "Administrator",
        employmentType: "Full-time",
        employmentLocation: "System",
        employmentStartDate: new Date().toISOString()
      } as Partial<UserProps>;

      const result = await UserRepository.create(adminData as UserProps);
      console.log("DEFAULT ADMIN: created successfully...");
      console.log(`Phone: ${adminPhone}`);
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
      console.log("⚠️  Please change the default password after first login!");
      
    } catch (error) {
      console.error("Error creating default admin:", error);
    }
  }
}

export default AppScript;
