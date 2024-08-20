import { Op } from "sequelize";
import User from "../models/user";
import { UserProps, UserQueryProps, AccountProps } from "../types";
import { Loan } from "../models/loan";
import AccountRepository from "./account-repository";
import dbClient from "../config/dbClient";
import Account from "../models/account";

class UserRepository {
  static async create(data: UserProps) {
    const _accountData = {} as AccountProps;
    data.registrationId = await UserRepository.generateRegNumber();
    _accountData.accountNumber = await AccountRepository.generateAccountNumber();

    return await dbClient.sequelize.transaction(async (transaction) => {
      const result = await User.create(data, { transaction });
      const _user = result.toJSON() as UserProps;

      _accountData.userId = _user.id;
      await Account.create(_accountData, { transaction });
      return _user;
    });
  }

  static async update(data: Partial<UserProps>, id: number) {
    return await User.update(data, { where: { id } });
  }

  static async generateRegNumber() {
    const year = new Date().getFullYear().toString().slice(-2);
    const lastInserted = await User.findOne({ order: [["id", "DESC"]] });
    const _lastUser = lastInserted?.toJSON() as UserProps;
    const prevRegId = _lastUser?.registrationId;

    if (!prevRegId) return `SGN-REG-${year}-00001`;

    const lastSequentialNumber = parseInt(prevRegId.slice(-5), 10);
    const newSequentialNumber = lastSequentialNumber + 1;
    return `SGN-REG-${year}-${newSequentialNumber.toString().padStart(5, "0")}`;
  }

  static async findByPk(id: number) {
    const result = await User.findByPk(id, { include: [{ model: Account }] });
    return result?.toJSON() as UserProps;
  }

  static async findUserWithLoans(userId: number) {
    const result = await User.findByPk(userId, {
      include: [{ model: Loan }, { model: Account }],
    });
    return result?.toJSON() as UserProps;
  }

  static async findOne(query: Partial<UserProps>) {
    const where = {} as UserProps;
    if (query.id) where.id = query.id;
    if (query.phone) where.phone = query.phone;
    if (query.publicId) where.publicId = query.publicId;
    if (query.isActive) where.isActive = query.isActive;
    if (query.isBanned) where.isBanned = query.isBanned;
    if (query.email) where.email = query.email;
    if (query.isDeleted) where.isDeleted = query.isDeleted;
    if (query.isVerified) where.isVerified = query.isVerified;
    if (query.profileSetup) where.profileSetup = query.profileSetup;
    if (query.registrationId) where.registrationId = query.registrationId;
    const result = await User.findOne({ where, include: [{ model: Account }] });
    return result?.toJSON() as UserProps;
  }

  static async findAll(query: UserQueryProps) {
    const limit = parseInt(query.limit || "20");
    const page = parseInt(query.page || "1");
    const totalPages = (count: number) => Math.ceil(count / limit);

    const where = {} as any;
    if (query.isActive) where.isActive = query.isActive;
    if (query.isBanned) where.isBanned = query.isBanned;
    if (query.id) where.id = query.id;
    if (query.isDeleted) where.isDeleted = query.isDeleted;
    if (query.isVerified) where.isVerified = query.isVerified;
    if (query.profileSetup) where.profileSetup = query.profileSetup;
    if (query.phone) where.phone = query.phone;
    if (query.registrationId) where.registrationId = query.registrationId;

    if (query.keyword) {
      const keywordPattern = `%${query.keyword.trim().split("").join("%")}%`;
      where[Op.or] = {
        email: { [Op.iLike]: keywordPattern },
        lastName: { [Op.iLike]: keywordPattern },
        firstName: { [Op.iLike]: keywordPattern },
      };
    }

    const response = await User.findAll({
      where,
      include: [{ model: Account }],
      limit: limit,
      offset: (page - 1) * limit,
      attributes: { exclude: ["password"] },
      order: [["id", "DESC"]],
    });
    const count = await User.count({ where });

    return {
      limit: limit,
      page: page,
      totalDocs: count,
      nextPage: page === totalPages(count) ? null : page + 1,
      totalPages: totalPages(count),
      data: response.map((item) => item.toJSON()) as UserProps[],
    };
  }
}

export default UserRepository;
