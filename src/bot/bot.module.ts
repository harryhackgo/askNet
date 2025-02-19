import { Module } from "@nestjs/common";
import { User, UserSchema } from "./schemas/user.model";
import { MongooseModule } from "@nestjs/mongoose";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
