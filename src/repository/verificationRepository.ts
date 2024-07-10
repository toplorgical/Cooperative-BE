import VerificationModel from "../models/verification";
import { VerificationProps } from "../types";

class VerificationRepository {
  static async create(data: VerificationProps): Promise<VerificationProps> {
    const result = await VerificationModel.create(data);
    return result.toJSON() as VerificationProps;
  }

  static async destroy(query: VerificationProps): Promise<number> {
    const where = {} as Partial<VerificationProps>;
    if (query.code) where.code = query.code;
    if (query.userId) where.userId = query.userId;

    const result = await VerificationModel.destroy({ where });
    return result;
  }

  static async findOne(query: VerificationProps): Promise<VerificationProps | null> {
    const where = {} as Partial<VerificationProps>;
    if (query.code) where.code = query.code;
    if (query.userId) where.userId = query.userId;

    const result = await VerificationModel.findOne({ where });
    return result ? (result.toJSON() as VerificationProps) : null;
  }
}

export default VerificationRepository;
