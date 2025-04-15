import moment from "moment";
import { Loan } from "../models/loan";
import TransactionHistory from "../models/transaction-history";
import { AccountProps, LoanProps, TransactionHistoryProps } from "../types";
import AccountRepository from "./account-repository";
import { Op, Sequelize } from "sequelize";
import _ from "lodash";
import User from "../models/user";

class AnanlyticsRepository {
  static async __default(query: { userId: number }) {
    const data = {
      loansBalance: 0,
      accountBalance: 0,
      approvedLoansCount: 0,
      txnsCountLastWeek: 0,
      loansCount: await Loan.count({ where: { userId: query?.userId } }),
      txnsCount: await TransactionHistory.count({ where: { userId: query?.userId } }),
      rejectedLoansCount: await Loan.count({ where: { userId: query.userId, status: "REJECTED" } }),
    };

    const account = await AccountRepository.findOne({ userId: query.userId } as AccountProps);
    const loanResult = await Loan.findAll({ where: { userId: query.userId, status: "APPROVED" } });

    const endDate = moment().add(1, "day").format("YYYY-MM-DD");
    const startDate = moment().subtract(7, "days").format("YYYY-MM-DD");

    const loans = loanResult.map((item) => item.toJSON()) as LoanProps[];

    data.approvedLoansCount = loanResult.length;
    data.loansBalance = loans.reduce((a, c) => a + c.amount, 0);
    data.accountBalance = account.balance;

    data.txnsCountLastWeek = await TransactionHistory.count({
      where: { userId: query?.userId, createdAt: { [Op.between]: [startDate, endDate] } },
    });

    return data;
  }

  static async loans(query: { userId?: number; period: "WEEKLY" | "MONTHLY" | "YEARLY" }) {
    const { periods, startDate } = AnanlyticsRepository.getPeriods(query.period);
    const where = { createdAt: { [Op.gte]: startDate, status: "APPROVED" } } as any;
    if (query?.userId) where.userId = query.userId;

    const loanResult = await Loan.findAll({ where });
    const loans = loanResult.map((item) => item.toJSON()) as LoanProps[];
    const analyticResult = [] as { period: string; sum: number; count: number }[];

    const groupLoans = _.groupBy(loans, (item) => {
      if (query.period === "WEEKLY") return moment(item.createdAt).format("ddd");
      if (query.period === "MONTHLY") return moment(item.createdAt).format("MMM");
      return moment(item.createdAt).format("YYYY");
    });

    for (const period of periods) {
      if (!groupLoans[period]) analyticResult.push({ period, sum: 0, count: 0 });
      else {
        const sum = groupLoans[period].reduce((a, c) => a + c.amount, 0);
        analyticResult.push({ period, sum, count: groupLoans[period].length });
      }
    }

    return analyticResult;
  }

  static async txns(query: { userId?: number; period: "WEEKLY" | "MONTHLY" | "YEARLY" }) {
    const { periods, startDate } = AnanlyticsRepository.getPeriods(query.period);
    const where = { createdAt: { [Op.gte]: startDate } } as any;
    if (query?.userId) where.userId = query.userId;

    const txnsResult = await TransactionHistory.findAll({ where });
    const txns = txnsResult.map((item) => item.toJSON()) as TransactionHistoryProps[];
    const analyticResult = [] as { period: string; sum: number; count: number }[];

    const groupTxns = _.groupBy(txns, (item) => {
      if (query.period === "WEEKLY") return moment(item.createdAt).format("ddd");
      if (query.period === "MONTHLY") return moment(item.createdAt).format("MMM");
      return moment(item.createdAt).format("YYYY");
    });

    for (const period of periods) {
      if (!groupTxns[period]) analyticResult.push({ period, sum: 0, count: 0 });
      else {
        const sum = groupTxns[period].reduce((a, c) => a + c.amount, 0);
        analyticResult.push({ period, sum, count: groupTxns[period].length });
      }
    }
    return analyticResult;
  }

  static async adminAnalytics(query?: { userId?: number }) {
    const where = {} as any;
    const _usersWhere = {} as any;
    if (query?.userId) where.userId = query.userId;
    if (query?.userId) _usersWhere.id = query.userId;
    const loans = await Loan.findAll({
      where,
      attributes: ["status", [Sequelize.fn("COUNT", Sequelize.col("id")), "count"]],
      group: ["status"],
    });

    let users = await User.findAll({
      where: { ..._usersWhere },
      attributes: ["isVerified", [Sequelize.fn("COUNT", Sequelize.col("id")), "count"]],
      group: ["isVerified"],
    });

    const savings = await TransactionHistory.sum("amount", {
      where: { type: "DEPOSIT" },
    });

    const usersMap = { isVerified: 0, isUnverified: 0, total: 0 };
    const _users = users.map((item) => item.toJSON() as { isVerified: boolean; count: number });
    usersMap.isVerified = _users.find((item) => item?.isVerified)?.count || 0;
    usersMap.isUnverified = _users.find((item) => item?.isVerified === false)?.count || 0;
    usersMap.total = _users.reduce((a, c) => a + Number(c?.count), 0);

    const loansMap = { cancelled: 0, approved: 0, rejected: 0, pending: 0, total: 0 };
    const _loans = loans.map((item) => item.toJSON() as { status: string; count: number });
    loansMap.cancelled = _loans.find((item) => item?.status === "CANCELED")?.count || 0;
    loansMap.approved = _loans.find((item) => item?.status === "APPROVED")?.count || 0;
    loansMap.rejected = _loans.find((item) => item?.status === "REJECTED")?.count || 0;
    loansMap.pending = _loans.find((item) => item?.status === "PENDING")?.count || 0;
    loansMap.total = _loans.reduce((a, c) => a + Number(c?.count), 0);

    if (query?.userId) return { loans: loansMap, savings };
    return { users: usersMap, loans: loansMap, savings };
  }

  static getPeriods(type: "WEEKLY" | "MONTHLY" | "YEARLY") {
    let startDate;
    let periods = [];
    if (type === "WEEKLY") {
      startDate = moment().subtract(7, "days");
      for (let i = 1; i <= 7; i++) {
        periods.push(startDate.clone().add(i, "days").format("ddd"));
      }
    } else if (type === "MONTHLY") {
      startDate = moment().subtract(12, "months");
      for (let i = 1; i <= 12; i++) {
        periods.push(startDate.clone().add(i, "months").format("MMM"));
      }
    } else if (type === "YEARLY") {
      startDate = moment().subtract(5, "years");
      for (let i = 1; i <= 5; i++) {
        periods.push(startDate.clone().add(i, "years").format("YYYY"));
      }
    }
    return { startDate: startDate?.format("YYYY-MM-DD"), periods };
  }
}

export default AnanlyticsRepository;
