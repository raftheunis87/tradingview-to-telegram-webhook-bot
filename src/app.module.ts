import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { validationSchema } from './config/schema';
import * as Joi from '@hapi/joi';
import app from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object(validationSchema),
      validationOptions: {
        allowUnknowns: false,
      },
      load: [app],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
