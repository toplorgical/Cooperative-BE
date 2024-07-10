import VerificationModel from "../models/verification";
import { VerificationPros } from "../types";

class VerificationRepository {
  static async create(data: VerificationPros) {
    const result = await VerificationModel.create(data);
    return result.toJSON() as VerificationPros;
  }

  static async destroy(query: VerificationPros): Promise<number> {
    const where = {} as Partial<VerificationPros>;
    if (query.code) where.code = query.code;
    if (query.userId) where.userId = query.userId;

    const result = await VerificationModel.destroy({ where });
    return result;
  }

  static async findOne(query: VerificationPros): Promise<VerificationPros | null> {
    const where = {} as Partial<VerificationPros>;
    if (query.code) where.code = query.code;
    if (query.userId) where.userId = query.userId;

    const result = await VerificationModel.findOne({ where });
    return result ? (result.toJSON() as VerificationPros) : null;
  }
}

export default VerificationRepository;
