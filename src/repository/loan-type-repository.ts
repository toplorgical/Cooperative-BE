import { LoanType } from "../models/loan";
import { LoanTypeProps } from "../types";

class LoanTypeRepository {
  static async create(data: LoanTypeProps) {
    const result = await LoanType.create(data);
    return result.toJSON() as LoanTypeProps;
  }

  static async bulkCreate(data: LoanTypeProps[]) {
    const result = await LoanType.bulkCreate(data);
    return result?.map((item) => item.toJSON()) as LoanTypeProps[];
  }

  static async updateById(data: LoanTypeProps, id: number) {
    return await LoanType.update(data, { where: { id } });
  }

  static async findById(id: number) {
    const result = await LoanType.findByPk(id);
    return result?.toJSON() as LoanTypeProps;
  }

  static async findOne(query?: Partial<LoanTypeProps>) {
    const where = {} as LoanTypeProps;
    if (query?.id) where.id = query.id;

    const result = await LoanType.findOne({ where });
    return result?.toJSON() as LoanTypeProps;
  }

  static async findAll(query?: any) {
    const response = await LoanType.findAll({
      attributes: { exclude: ["amountPaid", "balance"] },
      order: [["id", "DESC"]],
    });
    return {
      data: response.map((item) => item.toJSON()),
    };
  }
}
export default LoanTypeRepository;
