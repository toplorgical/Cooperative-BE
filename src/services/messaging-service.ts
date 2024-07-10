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
  static async send(data: MassagingProps) {
    data.from = "Toplorgical";
    data.api_key = config.TERMII.API_KEY;
    data.type = "plain";
    data.channel = "generic";

    await axios.post(config.TERMII.URL, data);
  }
}

export default MessagingService;
