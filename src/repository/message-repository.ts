import Message from "../models/message";
import { MessageProps } from "../types";

class MessageRepository {
  static async create(data: MessageProps) {
    const result = await Message.create(data);
    return result.toJSON() as MessageProps;
  }

  static async bulkCreate(data: MessageProps[]) {
    const result = await Message.bulkCreate(data);
    return result?.map((item) => item.toJSON()) as MessageProps[];
  }

  static async update(data: MessageProps, id: number) {
    return await Message.update(data, { where: { id } });
  }

  static async findById(id: number) {
    const result = await Message.findByPk(id);
    return result?.toJSON() as MessageProps;
  }

  static async deleteOne(id: number) {
    return await Message.destroy({ where: { id } });
  }

  static async findOne(query?: Partial<MessageProps>) {
    const where = {} as MessageProps;
    if (query?.id) where.id = query.id;
    if (query?.from) where.from = query.from;
    if (query?.to) where.to = query.to;

    const result = await Message.findOne({ where, attributes: { exclude: ["from"] } });
    return result?.toJSON() as MessageProps;
  }

  static async findAll(query?: any) {
    const where = {} as MessageProps;
    if (query?.id) where.id = query.id;
    if (query?.from) where.from = query.from;
    if (query?.to) where.to = query.to;

    const response = await Message.findAll({
      where,
      attributes: { exclude: ["from"] },
      order: [["id", "DESC"]],
    });
    return {
      data: response.map((item) => item.toJSON()),
    };
  }
}
export default MessageRepository;
