import HttpService from "@/services/httpService";

class AnalyticsRepository {
  static async getDefaultAnalytics() {
    const params = {};
    return await HttpService.http.get("/user/analytics/default", { params });
  }
}

export default AnalyticsRepository;
