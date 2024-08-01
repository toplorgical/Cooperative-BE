import { MessageProps } from "../types";

class MessageService {
  static constructMessage(data: any[]) {
    const result = [] as MessageProps[];
    for (const item of data) {
      const _data = {} as MessageProps;
      _data.from = item;
    }
  }
}

export default MessageService;
