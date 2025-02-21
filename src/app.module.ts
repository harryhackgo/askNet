import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { BotModule } from "./bot/bot.module";
import { SurveyStatusModule } from './survey_status/survey_status.module';
import { PaymentsModule } from './payments/payments.module';
import { ResponsesModule } from './responses/responses.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswerOptionsModule } from './answer_options/answer_options.module';
import { SurveysModule } from './surveys/surveys.module';
import { StatysticsModule } from './statystics/statystics.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotModule],
        options: {},
      }),
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    BotModule,
    AdminModule,
    AuthModule,
    SurveyStatusModule,
    PaymentsModule,
    ResponsesModule,
    QuestionsModule,
    AnswerOptionsModule,
    SurveysModule,
    StatysticsModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
