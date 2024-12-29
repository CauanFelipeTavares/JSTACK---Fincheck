import { Controller, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId.decorator'
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { CustomApiUnauthorizedResponse } from 'src/shared/decorators/Documentation.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @CustomApiUnauthorizedResponse()
  @ApiOkResponse({ description: 'User data', example: { name: 'Test Dev', email: 'testdev@gmail.com' } })
  @Get('/me')
  me(@ActiveUserId() userId: string){
    return this.usersService.getUserById(userId)
  }
}
