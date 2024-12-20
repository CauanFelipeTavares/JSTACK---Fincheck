import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository){}

    async validade(userId: string, bankAccountId: string,){
    
        const bankAccount = await this.bankAccountsRepo.findFirst({
            where: {
                userId, id: bankAccountId,
            }
        })

        if(!bankAccount) throw new NotFoundException('Conta bancária não encontrada')

    }
}
