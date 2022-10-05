"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./common/http-exception.filter");
const success_interceptor_1 = require("./common/success.interceptor");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new success_interceptor_1.successInterceptor());
    app.use((0, cookie_parser_1.default)());
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    });
    const swaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
    };
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Account Book API')
        .setDescription('가계부 API입니다.')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
    }, 'access-token')
        .build();
    app.use([configService.get('SWAGGER_PATH')], (0, express_basic_auth_1.default)({
        challenge: true,
        users: {
            [configService.get('SWAGGER_USER')]: configService.get('SWAGGER_PASSWORD'),
        },
    }));
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, swaggerCustomOptions);
    const port = configService.get('TEST') === 'true'
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
//# sourceMappingURL=main.js.map