import { Response } from "express";
import { MessageProps } from "../types";
import ResponseManager from "../utils/response-manager";
import MessageRepository from "../repository/message-repository";
import { NotFoundError } from "../utils/errorHandler";

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
}

export default MessageController;
