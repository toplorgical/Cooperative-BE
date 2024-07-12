import { LoanPayment } from "../models/loan";
import { LoanPaymentProps, LoanPaymentQueryProps } from "../types/index";

class LoanPaymentRepository {
  static async create(data: LoanPaymentProps) {
    const result = await LoanPayment.create(data);
    return result.toJSON() as LoanPaymentProps;
  }

  static async updateById(data: LoanPaymentProps, id: number) {
    return await LoanPayment.update(data, { where: { id } });
  }

  static async findById(id: number) {
    const result = await LoanPayment.findByPk(id);
    return result?.toJSON() as LoanPaymentProps;
  }

  static async findOne(query: Partial<LoanPaymentProps>) {
    const where = {} as LoanPaymentProps;
    if (query.status) where.status = query.status;
    if (query.id) where.id = query.id;

    const result = await LoanPayment.findOne({ where });
    return result?.toJSON() as LoanPaymentProps;
  }

  static async findAll(query: LoanPaymentQueryProps) {
    const limit = parseInt(query.limit || "20");
    const page = parseInt(query.page || "1");
    const totalPages = (count: number, limit: number) => Math.ceil(count / limit);

    let where = {} as LoanPaymentProps;
    if (query.status) where.status = query.status;
    if (query.id) where.id = query.id;
    if (query.loanId) where.loanId = query.loanId;

    const response = await LoanPayment.findAll({
      where,
      limit,
      attributes: { exclude: ["amountPaid", "balance"] },
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });

    const count = await LoanPayment.count({ where });

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

export default LoanPaymentRepository;
