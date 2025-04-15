import HttpService from "@/services/httpService";
import { AuthProps, UserProps } from "@/types";

class UserRepository {
  static async signup(data: AuthProps) {
    data.phone = data.phone.replaceAll(" ", "");
    const { confirmPassword, ...others } = data;
    return await HttpService.http.post("/user/signup", others);
  }
  static async signin(data: AuthProps) {
    data.phone = data.phone.replaceAll(" ", "");
    const { rememberMe, ...others } = data;
    return await HttpService.http.post("/user/signin", others);
  }
  static async forgotPassword(data: AuthProps) {
    data.phone = data.phone.replaceAll(" ", "");
    return await HttpService.http.post("/user/forgot-password", data);
  }
  static async resetPassword(data: AuthProps) {
    const { confirmPassword, ...others } = data;
    return await HttpService.http.post("/user/reset-password", others);
  }
  static async verifyOTP(data: AuthProps) {
    data.code = data.code.replaceAll(" ", "");
    return await HttpService.http.post("/user/verify-otp", data);
  }
  static async requestOTP() {
    return await HttpService.http.get("/user/request-otp");
  }
  static async getAuthenticatedUser() {
    return await HttpService.http.get("/user/account");
  }

  static async addPersonalInfo(data: UserProps) {
    const payload = { ...data } as any;
    if (!payload.email) delete payload.email;
    if (!payload.postalCode) delete payload.postalCode;
    return await HttpService.http.put("/user/account/personal-info", payload);
  }
  static async addWorkInfo(data: UserProps) {
    return await HttpService.http.put("/user/account/work-info", data);
  }
}

export default UserRepository;
