import EventEmitter from "events";
import { UserProps } from "../types";
import UserService from "../services/user-service";

const UserEventEmitter = new EventEmitter();

UserEventEmitter.on("REQUEST_OTP", (data: UserProps) => {
  UserService.requestOTP(data);
});

export default UserEventEmitter;
