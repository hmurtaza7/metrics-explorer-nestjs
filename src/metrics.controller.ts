import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class MetricsController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('MetricsService', 'GetHello')
  getHello(): { message: string } {
    const message = this.appService.getHello();
    return { message };
  }
}
