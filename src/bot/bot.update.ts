import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    this.botService.start(ctx);
  }
  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    this.botService.onContact(ctx);
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    await this.botService.deleteUncaughtMessage(ctx);
  }

  @Action(/^approve_\d+$/)
  async onClickLocation(@Ctx() ctx: Context) {
    await this.botService.onClickApprove(ctx);
  }

  @Action(/^cancel_\d+$/)
  async onDelLocation(@Ctx() ctx: Context) {
    await this.botService.onClickCancel(ctx);
  }
}
