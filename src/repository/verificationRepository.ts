import { Op } from "sequelize";

import { UserProps, UserQueryProps, VerificationPros } from "../types";
import VerificationModel from "../models/verification";

class VerificationRepository {
  static async create(data: VerificationPros) {
    const result = await VerificationModel.create(data);
    return result.toJSON() as VerificationPros;
  }
  static async findAndDelete(query: VerificationPros) {
    const where = {} as VerificationPros;
    if (query.code) where.code = query.code;
    if (query.userId) where.userId = query.userId;
    const result = await VerificationModel.findAndDelete({ where });
    return result?.toJSON() as UserProps;
  }

  static async findOne(query: VerificationPros) {
    const where = {} as VerificationPros;
    if (query.code) where.code = query.code;
    if (query.userId) where.userId = query.userId;
    const result = await VerificationModel.findOne({ where });
    return result?.toJSON() as VerificationPros;
  }

  
}

export default VerificationRepository;
