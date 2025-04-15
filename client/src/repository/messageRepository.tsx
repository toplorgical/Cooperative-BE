import HttpService from "@/services/httpService";
import { messageQueryProps } from "@/types";

class MessageRepository {
  static async acceptGuarantorship(id: string | number) {
    return await HttpService.http.post("/user/guarantors/accept/" + id, {});
  }
  static async rejectGuarantorship(id: string | number) {
    return await HttpService.http.post("/user/guarantors/reject/" + id, {});
  }

  static async find(query?: messageQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/user/messages", { params });
  }

  static async findOne(id: string | number, query?: messageQueryProps) {
    const params = { ...query };
    return await HttpService.http.get("/user/messages/" + id, { params });
  }
  static async sendMessage(data: any) {
    const formData = { data: {}, usersQuery: {}, loansQuery: { status: [] } } as any;
    formData.data = { subject: data?.subject, content: data?.message };

    if (data.usersQuery.isBanned) formData.usersQuery.isBanned = data.usersQuery.isBanned;
    if (data.usersQuery.isActive) formData.usersQuery.isActive = data.usersQuery.isActive;
    if (data.usersQuery.isVerified) formData.usersQuery.isVerified = data.usersQuery.isVerified;

    if (!data.usersQuery.isActive && data.usersQuery?.isInactive) formData.usersQuery.isActive = false;
    if (!data.usersQuery.isVerified && data.usersQuery?.isUnverified) formData.usersQuery.isVerified = false;

    if (data.loansQuery?.pending) formData.loansQuery.status.push("PENDING");
    if (data.loansQuery?.approved) formData.loansQuery.status.push("APPROVED");
    if (data.loansQuery?.rejected) formData.loansQuery.status.push("REJECTED");
    if (data.loansQuery?.canceled) formData.loansQuery.status.push("CANCELED");
    if (!formData?.loansQuery?.length) delete formData.loansQuery;
    return await HttpService.http.post("/admin/users/send-email/", formData);
  }
}

export default MessageRepository;
