import HttpService from "@/services/httpService";
import { AuthProps, LoanQueryProps, TransactionHistoryProps, TrxnQueryProps, UserProps, UserQueryProps } from "@/types";

class AdminRepository {
  static async findUsers(query: UserQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/admin/users/", { params });
  }

  static async findOneUser(id: string, query?: UserQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/admin/users/" + id, { params });
  }
  static async getLoanTypes() {
    const params = {};
    return await HttpService.http.get("/admin/loan-types", { params });
  }
  static async findLoans(query: LoanQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/admin/loans/", { params });
  }

  static async findOneLoan(id: string, query?: LoanQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/admin/loans/" + id, { params });
  }
  static async changeLoanStatus(data: { id: number | string; status: string }) {
    return await HttpService.http.post("/admin/loans/change-status/", data);
  }

  static async getSingleLoan(id: string) {
    return await HttpService.http.get(`/loan/loan/${id}`);
  }

  static async getAllLoans(data: AuthProps) {
    data.code = data.code.replaceAll(" ", "");
    return await HttpService.http.get("/loan/loans");
  }
  static async getAllUsers() {
    return await HttpService.http.get("/user/users");
  }

  static async userAction(data: UserProps) {
    return await HttpService.http.put(`/user/action/`, data);
  }

  static async getAdminAlytics(query?: { userId?: string }) {
    return await HttpService.http.get("/admin/analytics", { params: { ...query } });
  }

  static async getAllDeposit() {
    return await HttpService.http.get("/admin/deposit");
  }

  static async getTransactions(query: TrxnQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/admin/txns", { params });
  }
  static async getOneTransaction(id: string, query?: TrxnQueryProps) {
    const params = { ...query };
    return await HttpService.http.get(`/admin/txns/${id}`, { params });
  }
}

export default AdminRepository;
