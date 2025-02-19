import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  user_id: number;

  @Prop({ required: true, trim: true })
  username: string;

  @Prop({ trim: true })
  first_name: string;

  @Prop({ trim: true })
  last_name: string;

  @Prop({ trim: true })
  real_name: string; //

  @Prop({ enum: ["male", "female"], trim: true })
  gender: string; //

  @Prop()
  birth_year: number; //

  @Prop({ trim: true })
  phone_number: string; //

  @Prop({ unique: true, trim: true })
  email: string; //

  @Prop({ default: false })
  status: boolean;

  @Prop({ trim: true })
  user_lang: string;

  @Prop({ default: 5000 })
  balance: number;

  @Prop({ trim: true, default: "1234" })
  offer_code: string;

  @Prop()
  last_state: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
