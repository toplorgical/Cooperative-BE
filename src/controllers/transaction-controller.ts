import TransactionHistoryRepository from "../repository/transaction-history-repository";
import ResponseManager from "../utils/response-manager";

class TransactionController {
  static async findOne(req: any, res: any) {
    const query = { id: Number(req.params.id) } as any;
    if (req.user) query.userId = req.user.id;
    const result = await TransactionHistoryRepository.findOne(query);
    ResponseManager.success(res, result, 200);
  }

  static async findAll(req: any, res: any) {
    const query = { ...req.query } as any;
    if (req.user) query.userId = req.user.id;
    const result = await TransactionHistoryRepository.findAll(query);
    ResponseManager.success(res, result, 200);
  }
}

export default TransactionController;
