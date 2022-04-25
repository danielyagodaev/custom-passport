import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SecretFromHeaderAuthGuard } from '@shared/common';

@Controller()
@UseGuards(SecretFromHeaderAuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
