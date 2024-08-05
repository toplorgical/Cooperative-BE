import { Op } from "sequelize";
import { Loan, LoanGuarantor, LoanType } from "../models/loan";
import { LoanGuarantorProps, LoanProps, LoanQueryProps } from "../types/index";
import dbClient from "../config/dbClient";
import User from "../models/user";
import crypto from "crypto";
import _ from "lodash";

class LoanRepository {
  static async create(data: LoanProps) {
    return await dbClient.sequelize.transaction(async (transaction) => {
      const result = await Loan.create(data, { transaction });
      const loan = result.toJSON() as LoanProps;

      data.guarantors = data.guarantors.map((item) => ({ ...item, loanId: loan.id }));
      await LoanGuarantor.bulkCreate(data.guarantors, { transaction });
      return loan;
    });
  }
  static async updateById(data: LoanProps, id: number) {
    return await Loan.update(data, { where: { id } });
  }

  static async findById(id: number) {
    const result = await Loan.findByPk(id);
    return result?.toJSON() as LoanProps;
  }

  static async updateOneGuarantor(data: LoanGuarantorProps, id: number) {
    return await LoanGuarantor.update(data, { where: { id } });
  }
  static async findGuarantors(query?: { userId?: number; loanId?: number }) {
    const where = {} as any;
    if (query?.loanId) where.loanId = query.loanId;
    if (query?.userId) where.userId = query.userId;
    const result = await LoanGuarantor.findAll({
      where,
      include: [{ model: User, attributes: ["firstName", "lastName", "email", "phone"] }],
    });
    return result?.map((item) => item.toJSON() as LoanGuarantorProps);
  }
  static async findOneGuarantor(query: { userId?: number; id: number }) {
    const where = {} as any;
    if (query.id) where.id = query.id;
    if (query.userId) where.userId = query.userId;
    const result = await LoanGuarantor.findOne({
      where,
      include: [{ model: User, attributes: ["firstName", "lastName", "email", "phone"] }],
    });
    return result?.toJSON() as LoanGuarantorProps;
  }

  static async findByRef(ref: string) {
    const result = await Loan.findOne({
      where: { ref },
      attributes: ["amount", "loanTypeId", "duration", "totalInterest", "totalRepayments", "rate"],
      include: [{ model: LoanType }],
    });
    return result?.toJSON() as LoanProps;
  }

  static async findOne(query: Partial<LoanProps>) {
    const where = {} as LoanProps;
    if (query.status) where.status = query.status;
    if (query.id) where.id = query.id;
    if (query.userId) where.userId = query.userId;
    if (query.loanTypeId) where.loanTypeId = query.loanTypeId;

    const result = await Loan.findOne({
      where,
      include: [
        { model: LoanType },
        {
          model: User,
          attributes: [
            "firstName",
            "lastName",
            "registrationId",
            "isVerified",
            "employmentType",
            "jobTitle",
            "contactAddress",
          ],
        },
        { model: LoanGuarantor, include: [{ model: User, attributes: ["firstName", "lastName", "registrationId"] }] },
      ],
    });
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
    if (query.loanTypeId) where.loanTypeId = query.loanTypeId;
    if (query.keyword) {
      const keyword = `%${query.keyword.trim().split("").join("%")}%`;
      where = {
        [Op.or]: [
          { status: { [Op.iLike]: keyword } },
          { loanId: { [Op.iLike]: keyword } },
          { userId: { [Op.iLike]: keyword } },
        ],
      };
    }
    const response = await Loan.findAll({
      where,
      limit,
      include: [
        { model: LoanType },
        {
          model: User,
          attributes: ["firstName", "lastName", "registrationId"],
        },
        { model: LoanGuarantor, include: [{ model: User, attributes: ["firstName", "lastName", "registrationId"] }] },
      ],
      attributes: { exclude: ["amountPaid", "balance"] },
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
      data: response.map((item) => item.toJSON()) as LoanProps[],
    };
  }
}

// (async function () {
//   await Loan.update({ ref: crypto.randomUUID() }, { where: { ref: null } });
//   console.log("Loans ref updated");
// })();

export default LoanRepository;
