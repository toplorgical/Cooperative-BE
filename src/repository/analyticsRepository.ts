import moment from "moment";
import { Loan } from "../models/loan";
import TransactionHistory from "../models/transaction-history";
import { AccountProps, LoanProps, TransactionHistoryProps } from "../types";
import AccountRepository from "./account-repository";
import { Op } from "sequelize";
import _ from "lodash";

class AnanlyticsRepository {
  static async __default(query: { userId: number }) {
    const data = {
      loansBalance: 0,
      txnsCount: 0,
      accountBalance: 0,
      approvedLoansCount: 0,
      loansCount: await Loan.count({ where: { userId: query?.userId } }),
      rejectedLoansCount: await Loan.count({ where: { userId: query?.userId, status: "REJECTED" } }),
    };

    const account = await AccountRepository.findOne({ userId: query.userId } as AccountProps);
    const loanResult = await Loan.findAll({ where: { userId: query?.userId, status: "APPROVED" } });

    const txnsResult = await TransactionHistory.findAll({ where: { userId: query?.userId } });
    const loans = loanResult.map((item) => item.toJSON()) as LoanProps[];
    const txns = txnsResult.map((item) => item.toJSON()) as TransactionHistoryProps[];

    data.approvedLoansCount = loanResult.length;
    data.loansBalance = loans.reduce((a, c) => a + c.amount, 0);
    data.accountBalance = account.balance;
    data.txnsCount = txns.length;

    return data;
  }

  static async loans(query: { userId: number; type: "WEEKLY" | "MONTHLY" | "YEARLY" }) {
    const { periods, startDate } = AnanlyticsRepository.getPeriods(query.type);

    const loanResult = await Loan.findAll({
      where: {
        userId: query?.userId,
        status: "APPROVED",
        createdAt: {
          [Op.gte]: startDate,
        },
      },
    });

    const loans = loanResult.map((item) => item.toJSON()) as LoanProps[];
    const analyticResult = [] as { period: string; sum: number }[];

    const groupLoans = _.groupBy(loans, (item) => {
      if (query.type === "WEEKLY") {
        return moment(item.createdAt).day("ddd");
      }
      if (query.type === "MONTHLY") {
        return moment(item.createdAt).day("MMM");
      }
      if (query.type === "YEARLY") {
        return moment(item.createdAt).day("YYYY");
      }
    });

    for (const period of periods) {
      if (!groupLoans[period]) analyticResult.push({ period, sum: 0 });
      else {
        const sum = groupLoans[period].reduce((a, c) => a + c.amount, 0);
        analyticResult.push({ period, sum });
      }
    }

    return analyticResult;
  }

  static async txns(query: { userId: number; type: "WEEKLY" | "MONTHLY" | "YEARLY" }) {
    const { periods, startDate } = AnanlyticsRepository.getPeriods(query.type);

    const txnsResult = await TransactionHistory.findAll({
      where: {
        userId: query?.userId,
        createdAt: {
          [Op.gte]: startDate,
        },
      },
    });

    const txns = txnsResult.map((item) => item.toJSON()) as TransactionHistoryProps[];
    const analyticResult = [] as { period: string; sum: number }[];

    const groupTxns = _.groupBy(txns, (item) => {
      if (query.type === "WEEKLY") {
        return moment(item.createdAt).day("ddd");
      }
      if (query.type === "MONTHLY") {
        return moment(item.createdAt).day("MMM");
      }
      if (query.type === "YEARLY") {
        return moment(item.createdAt).day("YYYY");
      }
    });

    for (const period of periods) {
      if (!groupTxns[period]) analyticResult.push({ period, sum: 0 });
      else {
        const sum = groupTxns[period].reduce((a, c) => a + c.amount, 0);
        analyticResult.push({ period, sum });
      }
    }

    return analyticResult;
  }

  static getPeriods(type: "WEEKLY" | "MONTHLY" | "YEARLY") {
    let startDate;
    let periods = [];
    if (type === "WEEKLY") {
      startDate = moment().subtract(7, "days");
      for (let i = 0; i <= 7; i++) {
        periods.push(startDate.clone().add(i, "days").format("ddd"));
      }
    } else if (type === "MONTHLY") {
      startDate = moment().subtract(12, "months");
      for (let i = 0; i <= 12; i++) {
        periods.push(startDate.clone().add(i, "months").format("MMM"));
      }
    } else if (type === "YEARLY") {
      startDate = moment().subtract(5, "years");
      for (let i = 0; i <= 5; i++) {
        periods.push(startDate.clone().add(i, "years").format("YYYY"));
      }
    }
    return { startDate, periods };
  }
}

export default AnanlyticsRepository;
