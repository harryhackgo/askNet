import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

async function start() {
  try {
    const PORT = process.env.PORT ?? 3003;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      })
    );
    app.setGlobalPrefix("api");
    app.use(bodyParser.json());
    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:8000",
          "http://localhost:3000",
          "https://asknet.uz",
          "https://api.asknet.uz",
          "https://asknet.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by CORS"));
        }
      },
      mothods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, //cokkie va header
    });

    const config = new DocumentBuilder()
      .setTitle("Asknet example")
      .setDescription("Asknet API description")
      .setVersion("1.0")
      .addBearerAuth()
      .addTag(
        "Chegirma, validation, swagger, guard, sequelize, pg, mailer, bot, cookie, tokens"
      )
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, documentFactory);

    await app.listen(PORT, () => {
      console.log(`Server has started working at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
