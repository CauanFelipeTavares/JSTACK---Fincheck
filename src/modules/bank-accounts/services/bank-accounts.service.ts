import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountService } from './validate-bankacc-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountService: ValidateBankAccountService
  ){}
  
  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto

    return this.bankAccountsRepo.create({
      data: {
        color, initialBalance, name, type,
        userId,
      }
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepo.findMany({
      where: { userId }
    });
  }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    
    await this.validateBankAccountService.validade(userId, bankAccountId)

    const { color, initialBalance, name, type } = updateBankAccountDto

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        color, initialBalance, name, type
      }
    })

  }

  async remove(userId: string, bankAccountId: string, ) {
    
    await this.validateBankAccountService.validade(userId, bankAccountId)

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId }
    })

    return null

  }

}
