import { Op } from "sequelize";
import Verification from "../models/verificationModel";
import { UserProps, UserQueryProps, VerificationPros } from "../types";

class VerificationRepository {
  static async create(data: VerificationPros) {
    const result = await Verification.create(data);
    return result.toJSON() as VerificationPros;
  }
  static async findAndDelete(query: VerificationPros) {
    const where = {} as VerificationPros;
    if (query.code) where.code = query.code;
    if (query.userId) where.userId = query.userId;
    const result = await Verification.findAndDelete({ where });
    return result?.toJSON() as UserProps;
  }

  static async findOne(query: VerificationPros) {
    const where = {} as VerificationPros;
    if (query.code) where.code = query.code;
    if (query.userId) where.userId = query.userId;
    const result = await Verification.findOne({ where });
    return result?.toJSON() as VerificationPros;
  }

  
}

export default VerificationRepository;
