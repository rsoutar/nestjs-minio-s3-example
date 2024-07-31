import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug'], // Add 'debug' to see our debug logs
  });
  await app.listen(3000);
}
bootstrap();
