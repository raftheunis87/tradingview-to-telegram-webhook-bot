import { Body, Controller, Logger, Post } from '@nestjs/common';
import { TelegramMessage } from 'nestjs-telegram/dist/interfaces/telegramTypes.interface';
import { Observable } from 'rxjs';
import { AlertsService } from './alerts.service';

@Controller()
export class AlertsController {
  private readonly logger = new Logger(AlertsController.name);

  constructor(private alertsService: AlertsService) {}

  @Post()
  createAlert(@Body() message: string): Observable<TelegramMessage> {
    this.logger.verbose(`>>>> alerts (POST). Body: '${message}'`);
    return this.alertsService.process(message);
  }
}
