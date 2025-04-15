import HttpService from "@/services/httpService";
import { LoanProps } from "@/types";

export interface LoanQueryProps extends LoanProps {
  page: string | number;
  limit: string | number;
}

class LoanRepository {
  static async create(data: LoanProps, id?: string) {
    if (id) return await HttpService.http.put("/user/loans" + id, data);
    return await HttpService.http.post("/user/loans", data);
  }

  static async cancel(id: string) {
    return await HttpService.http.post("/user/loans/cancel/" + id, {});
  }

  static async find(query: LoanQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/user/loans/", { params });
  }

  static async findOne(id: string, query?: LoanQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/user/loans/" + id, { params });
  }

  static async getLoanTypes() {
    const params = {};
    return await HttpService.http.get("/user/loans/types", { params });
  }
  static async gurantorsAction(id: string, type: "accept" | "reject") {
    const params = {};
    return await HttpService.http.put(`/user/guarantors/${type}/` + id, {});
  }
}

export default LoanRepository;
