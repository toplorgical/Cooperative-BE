import { Response } from "express";
import LoanServices from "../services/loan-service";
import { LoanGuarantorProps } from "../types";
import ResponseManager from "../utils/response-manager";

class GuarantorController {
  static async accept(req: any, res: Response) {
    const id = req.params.id;
    const data = { status: "ACCEPTED" } as LoanGuarantorProps;
    await LoanServices.updateGuarantorStatus(data, id, req.user.id);
    ResponseManager.success(res, "Loan guarantor approval successful...");
  }
  static async reject(req: any, res: Response) {
    const id = req.params.id;
    const data = { status: "REJECTED" } as LoanGuarantorProps;
    await LoanServices.updateGuarantorStatus(data, id, req.user.id);
    ResponseManager.success(res, "Loan guarantor rejection successful...");
  }
}

export default GuarantorController;
