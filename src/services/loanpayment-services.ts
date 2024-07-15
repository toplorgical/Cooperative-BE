
import UserRepository from "../repository/user-repository"
import LoanRepository from "../repository/loan-repository"
import { ApplicationError } from "../utils/errorHandler"
import {RESPONSE} from "../constants/index"
import { LoanProps, UserProps } from "../types"



class LaonPaymentService{

    static async repaymentFromAccount(id :number, amount:number){
        const userData = await UserRepository.findUserWithLoans(id)
        if (!userData) throw new ApplicationError(RESPONSE.USER_EXIST)
        //if(userData.balance < amount) throw new ApplicationError(RESPONSE.INSUFFICIENT_FUND)
        userData.balance -= amount;
        let loan = userData["loans"].map(items=>items) 
        // 
         //loans.amount -= amount
         //loans.amountPaid += amount
        //let loanInfo = {amount : loans.amount , amountPaid:loans.amountPaid}
        
        // let userInfo = { balance: userData.balance } as UserProps;
        //const result1 = await LoanRepository.updateById(loanInfo,loans.id)
        //const result2 = await UserRepository.update(userInfo, id);
        return loan// {result: result1, ...result2}
        
      }
    



}








export default LaonPaymentService