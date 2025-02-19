import { Injectable } from "@nestjs/common";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.model";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    const user_id = ctx.from!.id;
    const user = await this.userModel.findOne({ user_id });
    if (user && user?.last_state != "finish") {
      await this.userModel.deleteOne({ user_id: user.user_id });
      await this.userModel.create({
        user_id,
        username: ctx.from?.username,
        first_name: ctx.from?.first_name,
        last_name: ctx.from?.last_name,
        user_lang: ctx.from?.language_code,
        last_state: "real_name",
      });
      await ctx.reply(`Hi! What is your name?`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    } else if (!user) {
      await this.userModel.create({
        user_id,
        username: ctx.from?.username,
        first_name: ctx.from?.first_name,
        last_name: ctx.from?.last_name,
        user_lang: ctx.from?.language_code,
        last_state: "real_name",
      });
      await ctx.reply(`Hi! What is your name?`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    } else {
      await this.bot.telegram.sendChatAction(user_id, "typing");
      await ctx.reply(`Welcome back ${user!.first_name}`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }

  async onContact(ctx: Context) {
    if ("contact" in ctx.message!) {
      const user_id = ctx.from!.id;
      const user = await this.userModel.findOne({ user_id });

      if (user) {
        user.phone_number = ctx.message.contact.phone_number;
        user.last_state = "email";
        await user.save();
        await ctx.reply(`Thank you! Now, what is your email address?`, {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        });
      }
    }
  }

  async onLocation(ctx: Context) {
    try {
      if ("location" in ctx.message!) {
        const user_id = ctx.from!.id;
        const user = await this.userModel.findOne({ user_id });

        if (user && user.last_state == "location") {
          // user.location = `${ctx.message.location.latitude},${ctx.message.location.longitude}`;
          // user.last_state = "start_time";
          await user.save();
          // await ctx.replyWithHTML(
          //   "Saved! Now, enter the time you start working\n\nExample: 8:00"
          // );
        }
      }
    } catch (error) {
      console.log("OnLocation error", error);
    }
  }

  async onText(ctx: Context) {
    try {
      if ("text" in ctx.message!) {
        const user_id = ctx.from!.id;
        const user = await this.userModel.findOne({ user_id });
        if (user && user.last_state != "finish") {
          if (user.last_state == "real_name") {
            user.real_name = ctx.message.text;
            user.last_state = "number";
            await user.save();
            await ctx.reply("Please share your contact", {
              ...Markup.keyboard([
                [Markup.button.contactRequest("Share my contact 📞")],
              ])
                .resize()
                .oneTime(),
            });
          } else if (user.last_state == "gender") {
            if (!["male", "female"].includes(ctx.message.text.toLowerCase()))
              return await ctx.reply("To'g'ri yo'lga qayting brodar", {
                ...Markup.removeKeyboard(),
              });
            user.gender = ctx.message.text;
            user.last_state = "birth_year";
            await user.save();
            await ctx.reply("Now, enter your birth year please", {
              ...Markup.removeKeyboard(),
            });
          } else if (user.last_state == "birth_year") {
            try {
              const birth_year = parseInt(ctx.message.text);
              if (
                isNaN(birth_year) ||
                birth_year < 1920 ||
                birth_year > new Date().getFullYear()
              ) {
                return await ctx.reply(
                  "Please enter a valid birth year (e.g., 1995)"
                );
              }
              user.birth_year = birth_year;
              user.last_state = "phone_number";
              await user.save();
              await ctx.reply("Please share your contact", {
                ...Markup.keyboard([
                  [Markup.button.contactRequest("Share my contact 📞")],
                ])
                  .resize()
                  .oneTime(),
              });
            } catch (error) {
              return await ctx.reply(
                "We are having a problem saving your birth year please make sure it is correct and resend it!"
              );
            }
          } else if (user.last_state == "email") {
            if (
              !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                ctx.message.text
              )
            )
              return await ctx.reply(
                "We are having a problem in saving your email, please make sure it is correct!"
              );
            user.email = ctx.message.text;
            user.last_state = "finish";
            await user.save();
            await ctx.reply("Please, send the location of your workplace", {
              ...Markup.removeKeyboard(),
            });
          }

          await ctx.replyWithHTML(`Success! Check your information`);
          await ctx.replyWithHTML(
            `<b>Name</b>: ${user.real_name}
<b>Gender</b>: ${user.gender}
<b>Birth year</b>: ${user.birth_year}
<b>Phone number</b>: ${user.phone_number}
<b>Email</b>: ${user.email}
`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Approve",
                      callback_data: `approve_${user.user_id}`,
                    },
                    {
                      text: "Cancel",
                      callback_data: `cancel_${user.user_id}`,
                    },
                  ],
                ],
              },
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUncaughtMessage(ctx: Context) {
    try {
      const contextMessage = ctx.message?.message_id;
      await ctx.deleteMessage(contextMessage);
    } catch (error) {
      console.log("OnStop error", error);
    }
  }

  async onClickApprove(ctx: Context) {
    try {
      await ctx.reply(
        "Youd infomration has been saved. You can use our service :D"
      );
    } catch (error) {
      console.log("OnStop error", error);
    }
  }

  async onClickCancel(ctx: Context) {
    try {
      const contextAction = ctx.callbackQuery!["data"];
      const user_id = contextAction.split("_")[1];

      const master = await this.userModel.findOneAndDelete({ user_id });

      await ctx.editMessageText("Your information has been deleted");
      await ctx.reply(`If you want to register again press the button below.`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } catch (error) {
      console.log("OnStop error", error);
    }
  }
}
