import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TelegramMessage } from 'nestjs-telegram/dist/interfaces/telegramTypes.interface';
import { Observable } from 'rxjs';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@Controller()
export class AlertsController {
  private readonly logger = new Logger(AlertsController.name);

  constructor(private alertsService: AlertsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createAlert(
    @Body() createAlertDto: CreateAlertDto,
  ): Observable<TelegramMessage> {
    this.logger.verbose(
      `>>>> alerts (POST). Body: '${JSON.stringify(createAlertDto)}'`,
    );
    return this.alertsService.process(createAlertDto);
  }
}
