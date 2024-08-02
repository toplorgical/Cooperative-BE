import Message from "../models/message";
import { LoanProps, MessageProps } from "../types";

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

(async function () {
  const _data = {} as MessageProps;
  _data.title = "Notification of Loan Request";
  _data.description = `This is to inform you that [James] with membership ID SGN-REG-24-00002 has submitted a loan request. As part of the application process, [SGN-REG-24-00002] has listed you as their guarantor for this loan.`;
  _data.from = 10;
  _data.to = 10;
  _data.metadata = {
    type: "loan",
    data: {
      amount: 6800,
      monthlyRepayment: 1141.6115542891068,
      totalInterest: 49.66932573464146,
      totalRepayments: 6849.6693257346415,
      rate: 2.5,
      id: 6,
      ref: "4ff4db1c-7a30-4d5a-931c-9bb7dca72e6c",
      loanTypeId: 1,
      duration: 6,
      status: "PENDING",
      userId: 10,
      loanType: {
        rate: 2.5,
        id: 1,
        name: "Personal Loan",
      },
    } as LoanProps,
  };

  await MessageRepository.create(_data);
  console.log("Message created");
});

export default MessageRepository;
