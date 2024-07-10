import axios from "axios";
import config from "../config/config";

interface MassagingProps {
  from: string;
  to: string[];
  sms: string;
  type: "plain";
  channel: "generic";
  api_key: string;
}

class MessagingService {
  static async send(data: Partial<MassagingProps>) {
    data.from = "Toplorgical";
    data.api_key = config.TERMII.API_KEY;
    data.type = "plain";
    data.channel = "generic";

    const { data: response } = await axios.post(config.TERMII.URL, data);
    console.log("MESSAGE SENT::", response);
  }
}

export default MessagingService;
