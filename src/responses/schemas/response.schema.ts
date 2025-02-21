import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import {
  IsInt,
  IsPositive,
  IsOptional,
  IsArray,
  IsString,
  IsNumber,
} from "class-validator";

export type ResponseDocument = HydratedDocument<Response>;

@Schema()
export class Response {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, auto: true })
  id: string;

  @Prop({ required: true, type: MongooseSchema.Types.BigInt })
  @IsInt()
  @IsPositive()
  participant_id: number;

  @Prop({ required: true, type: MongooseSchema.Types.BigInt })
  @IsInt()
  @IsPositive()
  question_id: number;

  @Prop({ type: [String], default: [] })
  @IsArray()
  @IsOptional()
  selected_options?: string[];

  @Prop({ type: String, default: null })
  @IsString()
  @IsOptional()
  text_response?: string;

  @Prop({ type: Number, default: null })
  @IsNumber()
  @IsOptional()
  numeric_response?: number;

  @Prop({ type: String, default: null })
  @IsString()
  @IsOptional()
  image?: string;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
