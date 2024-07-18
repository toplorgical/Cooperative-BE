
import UserRepository from "../repository/user-repository"
import LoanRepository from "../repository/loan-repository"
import { ApplicationError, LoanRequestError } from "../utils/errorHandler"
import {RESPONSE} from "../constants/index"
import { LoanProps, UserProps, AccountProps, LoanPaymentProps } from "../types"
import AccountRepository from "../repository/account-repository"
//import LoanPaymentRepository from "../repository/loan-payment-repository"



class LaonPaymentService{
//
   // static async repaymentFromAccount( userId: AccountProps, amount : number){
  //      const accountInfo = await AccountRepository.findOne(userId)
   //     const loanPaymentInfo = await LoanPaymentRepository.findOne(userId)
//if (!accountInfo) throw new ApplicationError(RESPONSE.USER_EXIST)
    //     if (loanPaymentInfo.status ==="COMPLETED") throw  new LoanRequestError(RESPONSE.PAYMENT_COMPLETED)
   //       if(accountInfo.balance < amount) throw new ApplicationError(RESPONSE.INSUFFICIENT_FUND)
   //       accountInfo.balance -= amount;
   //       loanPaymentInfo.amount -= amount 
   //       let totalAmount = loanPaymentInfo.amount += amount

   //     let loanInfo = {amount : loanPaymentInfo.amount , totalAmount} as any
        
       //  let account = { balance: accountInfo.balance } as AccountProps;
     //   const result1 = await LoanRepository.updateById(loanInfo,loanPaymentInfo.id)
      //  const result2 = await AccountRepository.updateById(account,accountInfo.id);
     //   return  {result: result1, ...result2}
        
    //  }
    



}








export default LaonPaymentService