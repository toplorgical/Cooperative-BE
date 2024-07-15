import Account from "../models/account";
import { AccountProps } from "../types";
import { generateId } from "../utils";

class AccountRepository {
  static async create(data: AccountProps) {
    let accountNumber = await AccountRepository.generateAccountNumber();
    data.accountNumber = accountNumber;
    const result = await Account.create(data);
    return result.toJSON() as AccountProps;
  }

  static async generateAccountNumber(): Promise<number> {
    let accountNumber = generateId(10);
    const existingAccount = await Account.findOne({ where: { accountNumber } });
    if (existingAccount) return AccountRepository.generateAccountNumber();
    return parseInt(accountNumber);
  }
}

export default AccountRepository;
