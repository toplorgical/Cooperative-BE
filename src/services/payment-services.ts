
import UserRepository from "../repository/user-repository"
import LoanRepository from "../repository/loan-repository"
import { ApplicationError, LoanRequestError } from "../utils/errorHandler"
import {RESPONSE} from "../constants/index"
import { LoanProps, UserProps, AccountProps, LoanPaymentProps } from "../types"
import AccountRepository from "../repository/account-repository"
import config from "../config/config"
import { error } from "console"
import TransactionHistoryRepository from "../repository/transaction-history-repository"

const crypto = require('crypto');
//import LoanPaymentRepository from "../repository/loan-payment-repository"



class PaymentService{
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


    static async paystackWebhook(data: any) {
        try {
            // Check if payment was successful
            if (data.data.status !== 'success') throw new ApplicationError(RESPONSE.NOT_SUCCESS);
            const amount = data.data.amount / 100;
            const phone = data.data.metadata.phone;
            const reference = data.data.reference;
            const transaction_type = "DEPOSIT";
            // Find the user by phone
            const user = await UserRepository.findOne({ phone });
            if (!user) throw new ApplicationError(RESPONSE.USER_NOT_FOUND);
            const accountInfo = await AccountRepository.findOne({ userId: user.id } as AccountProps);
            if (!accountInfo) {
                throw new ApplicationError(RESPONSE.USER_NOT_FOUND);
            }
            // Update account balance
            accountInfo.balance += amount;
            const update = await AccountRepository.updateById({ balance: accountInfo.balance } as AccountProps, accountInfo.id);
            // Create transaction record
            const transactionInfo :any = {
                reference,
                amount,
                userId: user.id,
                type: transaction_type,
                description: RESPONSE.CREDIT_DEC.replace("PLATFORM", "PAYSTACK"),
                metadata: data.data.customer
            };
            const transaction = await TransactionHistoryRepository.create(transactionInfo);
    
            return { transaction, update };
        } catch (error: any) {
           // console.log(error)
            return error;
        }


    }
}








export default PaymentService