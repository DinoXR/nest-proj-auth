import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let server;

export const handler = async (event, context) => {
  if (!server) {
    const nestApp = await NestFactory.create(AppModule);
    await nestApp.init();
    server = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return server(event, context);
};
