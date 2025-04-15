import AnanlyticsRepository from "../repository/analyticsRepository";
import ResponseManager from "../utils/response-manager";

class AnanlyticsController {
  static async getDefault(req: any, res: any) {
    const query = { ...req.query } as any;
    if (req.user) query.userId = req.user.id;
    const result = await AnanlyticsRepository.__default(query);
    ResponseManager.success(res, result, 200);
  }
  static async getTill(req: any, res: any) {
    const result = await AnanlyticsRepository.adminAnalytics({ ...req.query });
    ResponseManager.success(res, result, 200);
  }

  static async loans(req: any, res: any) {
    const query = { ...req.query } as any;
    if (req.user) query.userId = req.user.id;
    const result = await AnanlyticsRepository.loans(query);
    ResponseManager.success(res, result, 200);
  }

  static async txns(req: any, res: any) {
    const query = { ...req.query } as any;
    if (req.user) query.userId = req.user.id;
    const result = await AnanlyticsRepository.txns(query);
    ResponseManager.success(res, result, 200);
  }
}

export default AnanlyticsController;
