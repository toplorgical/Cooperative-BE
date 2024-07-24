import TransactionHistory from "../models/transaction-history";
import { LoanPaymentProps, LoanPaymentQueryProps, TransactionHistoryProps } from "../types/index";

interface TransactionQueryProps extends TransactionHistoryProps {
  page: string;
  limit: string;
}

class TransactionHistoryRepository {
  static async create(data: TransactionHistoryProps) {
    const result = await TransactionHistory.create(data);
    return result.toJSON() as TransactionHistoryProps;
  }

  static async updateById(data: TransactionHistoryProps, id: number) {
    return await TransactionHistory.update(data, { where: { id } });
  }

  static async findById(id: number) {
    const result = await TransactionHistory.findByPk(id);
    return result?.toJSON() as TransactionHistoryProps;
  }

  static async findOne(query: Partial<TransactionQueryProps>) {
    const where = {} as any;
    if (query.userId) where.id = query.userId;

    const result = await TransactionHistory.findOne({ where });
    return result?.toJSON() as LoanPaymentProps;
  }

  static async findAll(query: TransactionQueryProps) {
    const limit = parseInt(query.limit || "20");
    const page = parseInt(query.page || "1");
    const totalPages = (count: number, limit: number) => Math.ceil(count / limit);

    let where = {} as any;
    if (query.id) where.id = query.id;
    if (query.userId) where.userId = query.userId;

    const response = await TransactionHistory.findAll({
      where,
      limit,
      attributes: { exclude: ["amountPaid", "balance"] },
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });

    const count = await TransactionHistory.count({ where });

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

export default TransactionHistoryRepository;
