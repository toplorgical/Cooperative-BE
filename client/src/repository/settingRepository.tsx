import HttpService from "@/services/httpService";
import { AuthProps, SecurityProps, UserProps } from "@/types";

class SettingRepository {
  static async UpdateSecurity(data: SecurityProps) {
    const { confirmPassword, ...others } = data;
    return await HttpService.http.put("/user/account/change-password", others);
  }
  static async UpdatePhoneNumber(data: AuthProps) {
    return await HttpService.http.put("/user/account/change-phone", data);
  }

  static async UpdatePersonalInfo(data: UserProps) {
    const payload = { ...data } as any;
    if (!payload.email) delete payload.email;
    if (!payload.postalCode) delete payload.postalCode;
    return await HttpService.http.put("/user/account/personal-info", payload);
  }
  static async UpdateWorkInfo(data: UserProps) {
    return await HttpService.http.put("/user/account/work-info", data);
  }
}

export default SettingRepository;
