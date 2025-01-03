import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, HttpCode, HttpStatus, Query, ParseIntPipe, ParseEnumPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId.decorator';
import { TransactionType } from './entities/Transaction';
import { CustomApiUnauthorizedResponse } from 'src/shared/decorators/Documentation.decorator';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@CustomApiUnauthorizedResponse()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOkResponse({ description: 'Created Transaction' })
  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @ApiOkResponse({ description: 'Listed Transaction' })
  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', new ParseUUIDPipe({ optional: true })) bankAccountId?: string,
    @Query('type', new ParseEnumPipe(TransactionType, { optional: true })) type?: TransactionType,
  ) {
    return this.transactionsService.findAllByUserId(userId, { month, year, bankAccountId, type });
  }

  @ApiOkResponse({ description: 'Updated Transaction' })
  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    return this.transactionsService.update(userId, transactionId, updateTransactionDto);
  }

  @ApiOkResponse({ description: 'Deleted Transaction' })
  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string
  ) {
    return this.transactionsService.remove(userId, transactionId);
  }
}
