import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountService } from '../bank-accounts/services/validate-bankacc-ownership.service';
import { ValidateCategoryService } from '../categories/services/validate-category-ownership.service';
import { TransactionType } from './entities/Transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountService: ValidateBankAccountService,
    private readonly validateCategoryService: ValidateCategoryService
  ){}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {

    const { 
      bankAccountId, categoryId,
      date, name, type, value,
    } = createTransactionDto

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId })

    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId, categoryId,
        date, name, type, value,
      }
    })
  }

  findAllByUserId(
    userId: string,
    filters: { month: number, year: number, bankAccountId?: string, type?: TransactionType }
  ) {
    return this.transactionsRepo.findMany({
      where: { 
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)), // Essa new date page o primeiro momento desse ano e mes
          lt: new Date(Date.UTC(filters.year, filters.month + 1)) // filters.month + 1, se for == 12, conta ano que vem
          // Date.UTC ignora fuso horario, considerando GMT-0
        }
      }
    });
  }

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { 
      bankAccountId, categoryId,
      date, name, type, value,
    } = updateTransactionDto

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId, transactionId })

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId, categoryId,
        date, name, type, value
      }
    })
  }

  async remove(userId: string, transactionId: string) {
    await this.validateTransactionOwnership(userId, transactionId) 
  
    await this.transactionsRepo.delete({
      where: { id: transactionId }
    })

    return
  }

  private async validateEntitiesOwnership({
    userId, bankAccountId, categoryId, transactionId
  }: {
    userId: string
    bankAccountId: string
    categoryId: string
    transactionId?: string
  }){

    await Promise.all([
      transactionId && this.validateTransactionOwnership(userId, transactionId),
      this.validateBankAccountService.validade(userId, bankAccountId),
      this.validateCategoryService.validade(userId, categoryId),
    ])

  }

  private async validateTransactionOwnership(userId: string, transactionId: string){

    const transaction = await this.transactionsRepo.findFirst({
      where: { userId, id: transactionId }
    })

    if(!transaction) throw new NotFoundException('Transação não encontrada')

  }

}
