import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import expressBasicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get<ConfigService>(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Account Book API')
    .setDescription('가계부 API입니다.')
    .setVersion('1.0')
    // .addTag('cats')
    .build();

  app.use(
    [configService.get('SWAGGER_PATH')],
    expressBasicAuth({
      challenge: true,
      users: {
        [configService.get('SWAGGER_USER')]:
          configService.get('SWAGGER_PASSWORD'),
      },
    }),
  );
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const port =
    configService.get('TEST') === 'true'
      ? configService.get('TEST_PORT')
      : configService.get('PORT');
  console.log(`listening on port : ${port}`);

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
