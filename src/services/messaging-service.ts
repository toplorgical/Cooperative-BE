import axios from "axios";
import config from "../config/config";
import { SendMailProps, UserProps } from "../types";
import ejs from "ejs"
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

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
    console.log(data);
    try {
      data.to = data.to?.map((item) => item.replace("+", ""));
      data.from = "Toplorgical";
      data.api_key = config.TERMII.API_KEY;
      data.type = "plain";
      data.channel = "generic";
      const { data: response } = await axios.post(config.TERMII.URL, data);
      console.log("MESSAGE SENT::", response);
      return { status: "success", response };
    } catch (error) {
      console.log("MESSAGE NOT SENT::", error);
      return { status: "error", error };
    }
  }
}



export  class MailMessagingservices{

    static async SendMail(data : SendMailProps) {
    let apiKey = defaultClient.authentications['api-key'];
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    apiKey.apiKey = config.BROVO_MAIL.API_KEY;

  
  const htmlContent =await ejs.renderFile("./views/emailTemplate.ejs", { 
      name : data.name, 
      subject: data.subject,
      headerTitle: "Tolorgical mail",
      content: data.content 
  });

 

    sendSmtpEmail = {
      to: [{email:data.to}],
      sender:{email:"dev.team@toplorgical.com",name : "toplorgical"},
      htmlContent : htmlContent,
      subject : data.subject
    };
    console.log(sendSmtpEmail)

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data:SendMailProps) {
      console.log("ENAIL SENT...");
    }, function(error:any) {
      console.error("EMAIL NOT SENT:: ",error);
    });

    }

    }
      

