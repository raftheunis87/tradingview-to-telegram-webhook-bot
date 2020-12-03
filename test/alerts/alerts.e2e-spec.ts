import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { of } from 'rxjs';
import { TelegramMessage } from 'nestjs-telegram/dist/interfaces/telegramTypes.interface';
import { TelegramService } from 'nestjs-telegram';

const message = `
    Buy Alert!

    Exchange: BINANCE
    Pair: BTCUSDT
    Price: 20000`;

const sendMessageResponse: TelegramMessage = {
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

describe('Alerts', () => {
  let app: INestApplication;

  describe('with mocking', () => {
    const telegramService = {
      sendMessage: () => of(sendMessageResponse),
    };

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(TelegramService)
        .useValue(telegramService)
        .compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    describe('/bot/v1/alerts POST', () => {
      it('should return the TelegramMessage when correct body is passed', () => {
        return request(app.getHttpServer())
          .post('/bot/v1/alerts')
          .send(message)
          .expect(201)
          .expect(sendMessageResponse);
      });
    });
  });
});
