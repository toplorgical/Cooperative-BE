import axios from "axios";
import config from "../config/config";
import { SendMailProps } from "../types";
import ejs from "ejs";
import UserRepository from "../repository/user-repository";
var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;

export interface MassagingProps {
  from: string;
  to: string[];
  sms: string;
  type: "plain";
  channel: "generic" | "dnd";
  api_key: string;
}

export class SMSMessagingService {
  static async send(data: Partial<MassagingProps>) {
    try {
      data.type = "plain";
      data.channel = "dnd";
      data.from = "N-Alert";
      data.api_key = config.TERMII.API_KEY;
      data.to = data.to?.map((item) => "+234".concat(item.slice(1)));
      const { data: response } = await axios.post(config.TERMII.URL, data);
      console.log("MESSAGE SENT::", response);
      return { status: "success", response };
    } catch (error) {
      console.log("MESSAGE NOT SENT::", error);
      return { status: "error", error };
    }
  }
}

export class EmailMessagingservices {
  static async SendMail(data: SendMailProps) {
    let apiKey = defaultClient.authentications["api-key"];
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    apiKey.apiKey = config.BROVO_MAIL.API_KEY;

    for (const recipient of data.to) {
        const htmlContent = await ejs.renderFile("./views/emailTemplate.ejs", {
          name: recipient.firstName,
          subject: data.subject,
          headerTitle: "Toplogical Mail",
          content: data.content,
        });

    sendSmtpEmail = {
      to: [{ email: recipient.email, name: recipient.firstName  }],
      sender: { email: "dev.team@toplorgical.com", name: "toplorgical" },
      htmlContent: htmlContent,
      subject: data.subject,
    };
    

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data: SendMailProps) {
        console.log("ENAIL SENT...");
      },
      function (error: any) {
        console.error("EMAIL NOT SENT:: ", error);
      }
      );
  }
  }}



 

 

