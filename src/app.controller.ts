import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { GetAddressValueDTO } from "./dto/getAddressValue.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/getAddressValue/:address')
  getAddressValue(@Param() param: GetAddressValueDTO): Promise<object> {
    return this.appService.getAddressValue(param.address.toLowerCase());
  }
}
