import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { Request } from 'express'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@Req() request: any){
    return this.usersService.getUserById(request.userId)
  }
}
