import { Response } from "express";
import { MessageProps } from "../types";
import ResponseManager from "../utils/response-manager";
import MessageRepository from "../repository/message-repository";
import { ApplicationError, NotFoundError, ValidationError } from "../utils/errorHandler";
import UserRepository from "../repository/user-repository";
import { EmailMessagingservices } from "../services/messaging-service";
import { RESPONSE } from "../constants";
import _ from "lodash";
import UserValidations from "../validations/user-validations";

class MessageController {
  static async find(req: any, res: Response) {
    const query = { ...req.query } as MessageProps;
    if (req.user) query.to = req.user.id;
    const result = await MessageRepository.findAll(query);
    ResponseManager.success(res, result);
  }
  static async findOne(req: any, res: Response) {
    const id = req.params.id;
    const query = { ...req.query, id } as MessageProps;
    if (req.user) query.to = req.user.id;
    const result = await MessageRepository.findOne(query);
    if (!result) throw new NotFoundError("The requested message could not be found");

    ResponseManager.success(res, result);
  }

  static async sendMailToUsers(req: any, res: any){
    //UserValidations
    const error = UserValidations.message(req.body);
    if (error) throw new ValidationError(error);
    const {usersQuery,loansQuery,  data } = req.body 
    const id = req.admin.id
    if (!id) throw new ApplicationError(RESPONSE.UNAUTHORIZED, 401);
    const users = await UserRepository.findAllWithoutPagination(usersQuery, loansQuery )
    const uniqueEmails = _.uniqBy(users, (item) => item.email)
    data["to"] = uniqueEmails
    const response = await EmailMessagingservices.SendMail(data)
    ResponseManager.success(res, response);

    

  }
}

export default MessageController;
