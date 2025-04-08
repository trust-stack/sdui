import { ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { envConfig } from './config/env.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Server Driven UI')
        .setDescription('The Server Driven UI API documentation')
        .setVersion('1.0')
        .addTag('server-driven-ui')
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    // Apply the global exception filter
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    const env = app.get<ConfigType<typeof envConfig>>(envConfig.KEY);

    await app.listen(env.port);
}

bootstrap();
