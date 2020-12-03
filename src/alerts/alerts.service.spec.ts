import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TelegramService } from 'nestjs-telegram';
import {
  TelegramException,
  TelegramMessage,
} from 'nestjs-telegram/dist/interfaces/telegramTypes.interface';
import { of, throwError } from 'rxjs';
import { AlertsService } from './alerts.service';

const TELEGRAM_CHAT_ID = 'telegram_chat_id';

const mockTelegramService = () => ({
  sendMessage: jest.fn(),
});

export class MockConfigService {
  get(property: string) {
    if (property === 'telegram.chatId') {
      return TELEGRAM_CHAT_ID;
    }
  }
}

describe('AlertsService', () => {
  let alertsService;
  let telegramService;
  let configService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsService,
        { provide: TelegramService, useFactory: mockTelegramService },
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compile();

    alertsService = module.get<AlertsService>(AlertsService);
    telegramService = module.get<TelegramService>(TelegramService);
    configService = await module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(alertsService).toBeDefined();
  });

  describe('process', () => {
    const message = `
    Buy Alert!

    Exchange: BINANCE
    Pair: BTCUSDT
    Price: 20000`;

    const telegramResponse: TelegramMessage = {
      message_id: 1,
      from: {
        id: 1111111111,
        is_bot: true,
        first_name: 'this-is-the-bot-name',
        username: 'ThisIsTheBotName',
      },
      chat: {
        id: -111111111,
        title: 'This is the Telegram Group name',
        type: 'group',
        all_members_are_administrators: true,
      },
      date: 1111111111,
      text: message,
      entities: [
        { offset: 11, length: 4, type: 'bold' },
        { offset: 26, length: 7, type: 'bold' },
        { offset: 37, length: 7, type: 'bold' },
      ],
    };

    beforeEach(() => {
      telegramService.sendMessage = jest
        .fn()
        .mockReturnValueOnce(of(telegramResponse));
    });

    it('should throw an error when sendMessage fails', async (done) => {
      telegramService.sendMessage = jest
        .fn()
        .mockReturnValueOnce(
          throwError(new TelegramException('fancy_error_message')),
        );

      expect(telegramService.sendMessage).not.toHaveBeenCalled();

      await alertsService
        .process(message)
        .toPromise()
        .catch((err) => {
          expect(telegramService.sendMessage).toHaveBeenCalledTimes(1);
          expect(telegramService.sendMessage).toHaveBeenCalledWith({
            chat_id: TELEGRAM_CHAT_ID,
            parse_mode: 'html',
            text: message,
          });
          expect(err).toBeInstanceOf(HttpException);
          expect(err.status).toBe(400);
          expect(err.message).toEqual('fancy_error_message');
          done();
        });
    });

    it('should return a TelegramMessage when Telegram call succeeds', async (done) => {
      expect(telegramService.sendMessage).not.toHaveBeenCalled();

      await alertsService
        .process(message)
        .toPromise()
        .then((result) => {
          expect(telegramService.sendMessage).toHaveBeenCalledTimes(1);
          expect(telegramService.sendMessage).toHaveBeenCalledWith({
            chat_id: TELEGRAM_CHAT_ID,
            parse_mode: 'html',
            text: message,
          });
          expect(result).toEqual(telegramResponse);
          done();
        });
    });
  });
});
