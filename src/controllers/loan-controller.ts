import { Response, Request } from "express";
import LoanServices from "../services/loan-service";
import { LoanProps } from "../types";
import ResponseManager from "../utils/response-manager";
import { RESPONSE } from "../constants/index";
import LoanRepository from "../repository/loan-repository";
import { LoanRequestError } from "../utils/errorHandler";
import LoanTypeRepository from "../repository/loan-type-repository";

class LoanController {
  static async create(req: any, res: Response) {
    const userId = req.user.id as number;
    const data = {
      amount: req.body.amount,
      duration: req.body.duration,
      userId,
    } as LoanProps;

    const loanDetails = await LoanServices.create(data);
    ResponseManager.success(res, null, 200, RESPONSE.SUCCESS);
  }
  static async getLoans(req: any, res: Response) {
    const query = { ...req.query } as any;
    if (req.user) query.userId = req.user.id;
    const result = await LoanRepository.findAll(query);
    ResponseManager.success(res, result, 200);
  }
  static async getLoan(req: any, res: Response) {
    const query = { ...req.query } as any;
    if (req.user) query.userId = req.user.id;
    const result = await LoanRepository.findAll(query);
    ResponseManager.success(res, result, 200);
  }

  static async getLoanTypes(req: any, res: Response) {
    const result = await LoanTypeRepository.findAll();
    ResponseManager.success(res, result, 200);
  }

  static async cancelLoan(req: any, res: Response) {
    const userId = req.user.id;
    const loanId = req.params.id;
    if (!loanId && !userId) throw new LoanRequestError(RESPONSE.INVALID_CREDENTAILS);
    const loanDetails = await LoanServices.cancel({ loanId, userId });
    ResponseManager.success(res, loanDetails, 200);
  }
}

export default LoanController;
