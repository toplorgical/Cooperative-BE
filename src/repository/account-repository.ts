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

  static async findOne(query: AccountProps) {
    const where = {} as AccountProps;
    if (query.id) where.id = query.id;
    if (query.userId) where.userId = query.userId;

    const result = await Account.findOne({ where, include: [{ model: Account }] });
    return result?.toJSON() as AccountProps;
  }
  static async updateById(data: AccountProps, id: number) {
    return await Account.update(data, { where: { id } });
  }
}

export default AccountRepository;
