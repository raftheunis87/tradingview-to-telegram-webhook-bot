import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = app.get('ConfigService').get('app.port');

  // swagger
  const options = new DocumentBuilder()
    .setTitle('tradingview-to-telegram-webhook-bot')
    .setDescription(
      'A webhook written in Typescript to send TradingView alerts to a Telegram Bot.',
    )
    .setVersion('1.0')
    .addTag('tradingview-to-telegram-webhook-bot')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(
    `tradingview-to-telegram-webhook-bot listening on port '${port}'...`,
  );
}
bootstrap();
