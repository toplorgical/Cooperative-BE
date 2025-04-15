import HttpService from "@/services/httpService";
import { TransactionHistoryProps } from "@/types";

export interface TxnsQueryProps extends TransactionHistoryProps {
  page: string | number;
  limit: string | number;
}

class TransactionRepository {
  static async find(query: TxnsQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/user/transactions", { params });
  }

  static async findOne(id: string, query?: TxnsQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/user/transactions/" + id, { params });
  }

}

export default TransactionRepository;
