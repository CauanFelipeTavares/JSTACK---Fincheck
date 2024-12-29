import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId.decorator';
import { CustomApiUnauthorizedResponse } from 'src/shared/decorators/Documentation.decorator';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@CustomApiUnauthorizedResponse()
@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @ApiOkResponse({ description: 'Created Bank Account' })
  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: CreateBankAccountDto
  ) {
    return this.bankAccountsService.create(userId, createBankAccountDto);
  }

  @ApiOkResponse({ description: 'Listed Bank Accounts' })
  @Get()
  findAllByUserId(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @ApiOkResponse({ description: 'Updated Bank Account' })
  @Put(':bankAccountId')
  update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto
  ) {
    return this.bankAccountsService.update(userId, bankAccountId, updateBankAccountDto);
  }

  @ApiOkResponse({ description: 'Deleted Bank Account' })
  @Delete(':bankAccountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ) {
    return this.bankAccountsService.remove(userId, bankAccountId);
  }
}
