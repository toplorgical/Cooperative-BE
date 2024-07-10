import VerificationModel from "../models/verification";
import { VerificationProps } from "../types";

class VerificationRepository {
  static async create(data: VerificationProps) {
    const result = await VerificationModel.create(data);
    return result.toJSON() as VerificationProps;
  }

  static async destroy(query: VerificationProps) {
    const where = {} as Partial<VerificationProps>;
    if (query.code) where.code = query.code;
    if (query.userId) where.userId = query.userId;

    const result = await VerificationModel.destroy({ where });
    return result;
  }

  static async findOne(query: Partial<VerificationProps>) {
    const where = {} as Partial<VerificationProps>;
    if (query.code) where.code = query.code;
    if (query.userId) where.userId = query.userId;

    const result = await VerificationModel.findOne({ where });
    return result?.toJSON() as VerificationProps;
  }
}

export default VerificationRepository;
