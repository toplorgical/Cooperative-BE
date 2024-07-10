import axios from "axios";
import config from "../config/config";

export interface MassagingProps {
  from: string;
  to: string[];
  sms: string;
  type: "plain";
  channel: "generic";
  api_key: string;
}

export class MessagingService {
  static async send(data: Partial<MassagingProps>) {
    try {
      data.from = "Toplorgical";
      data.api_key = config.TERMII.API_KEY;
      data.type = "plain";
      data.channel = "generic";
      const { data: response } = await axios.post(config.TERMII.URL, data);
      return { status: "success", response };
    } catch (error) {
      console.log("MESSAGE SENT::", error);
      return { status: "error", error };
    }
  }
}

