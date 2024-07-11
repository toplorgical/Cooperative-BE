import { Op } from "sequelize";
import {Loan} from "../models/loan";
import { LoanProps, LoanQueryProps } from "../types";

class LoanRepository {
  static async create(data: LoanProps) {
    const result = await Loan.create(data);
    return result.toJSON() as LoanProps;
  }
  static async updateLoanById(data: LoanProps, id: number) {
    return await Loan.update(data, { where: { id } });
  }
  static async findLoanById(id: number) {
    return await Loan.findByPk(id);
  }
  static async findOne(query: Partial<LoanProps>) {
    const where = {} as LoanProps;
    if (query.status) where.status = query.status;
    if (query.id) where.id = query.id;
    if (query.userId) where.userId = query.userId;
    if (query.loanId) where.loanId = query.loanId;
    const result = await Loan.findOne({ where });
    return result?.toJSON() as LoanProps;
  }

  static async findAll(query: LoanQueryProps) {
    const limit = parseInt(query.limit || "20");
    const page = parseInt(query.page || "1");

    const totalPages = (count: number, limit: number) => Math.ceil(count / limit);

    let where: any = {};

    if (query.status) where.status = query.status;
    if (query.id) where.id = query.id;
    if (query.userId) where.userId = query.userId;
    if (query.loanId) where.loanId = query.loanId;

    if (query.keyword) {
      const keyword = `%${query.keyword.trim().split("").join("%")}%`;
      where = {
        [Op.or]: [
          { status: { [Op.like]: keyword } },
          { loanId: { [Op.like]: keyword } },
          { userId: { [Op.like]: keyword } }
        ]
      };
    }

    const response = await Loan.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });

    const count = await Loan.count({ where });

    return {
      limit,
      page,
      totalDocs: count,
      nextPage: page === totalPages(count, limit) ? null : page + 1,
      totalPages: totalPages(count, limit),
      data: response.map((item) => item.toJSON()),
    };
  }
}

export default LoanRepository;
