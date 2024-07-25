import { Response } from "express";
import LoanServices from "../services/loan-service";
import { LoanProps } from "../types";
import ResponseManager from "../utils/response-manager";
import LoanRepository from "../repository/loan-repository";
import LoanTypeRepository from "../repository/loan-type-repository";

class LoanController {
  static async create(req: any, res: Response) {
    const data = { ...req.body } as LoanProps;
    data.userId = req.user.id;
    const result = await LoanServices.create(data, req.user);
    ResponseManager.success(res, result, 201);
  }

  static async getLoans(req: any, res: Response) {
    const query = { ...req.query } as any;
    if (req.user) query.userId = req.user.id;
    const result = await LoanRepository.findAll(query);
    ResponseManager.success(res, result, 200);
  }

  static async getLoan(req: any, res: Response) {
    const query = { ...req.query, id: req.params.id } as any;
    if (req.user) query.userId = req.user.id;
    const result = await LoanRepository.findOne(query);
    ResponseManager.success(res, result, 200);
  }

  static async cancelLoan(req: any, res: Response) {
    const result = await LoanServices.cancel(req.params.id, req.user.id);
    ResponseManager.success(res, result.result, 200, result.message);
  }

  static async getLoanTypes(req: any, res: Response) {
    const result = await LoanTypeRepository.findAll();
    ResponseManager.success(res, result, 200);
  }

  static async createLoanType(req: any, res: Response) {
    const result = await LoanServices.createLoanType(req.body);
    ResponseManager.success(res, result, 201);
  }

  static async updateLoanType(req: any, res: Response) {
    const id = req.params.id;
    const result = await LoanServices.updateLoanType(req.body, id);
    ResponseManager.success(res, result, 200, "Loan type updated successfully.");
  }

  static async deleteLoanType(req: any, res: Response) {
    const id = req.params.id;
    const result = await LoanServices.deleteLoanType(id);
    ResponseManager.success(res, null, 200, result.message);
  }
}

export default LoanController;
