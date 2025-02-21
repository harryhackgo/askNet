import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IsInt, IsPositive, IsNumber, IsEnum, IsDate } from "class-validator";
import { Type } from "class-transformer";

export type PaymentDocument = HydratedDocument<Payment>;

enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

@Schema()
export class Payment {
  @Prop({ required: true, type: Number })
  @IsInt()
  @IsPositive()
  participant_id: number;

  @Prop({ required: true, type: Number })
  @IsInt()
  @IsPositive()
  survey_id: number;

  @Prop({ required: true, type: Number, min: 0 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @Prop({ required: true, enum: PaymentStatus })
  @IsEnum(PaymentStatus, {
    message: "Payment status must be PENDING, COMPLETED, or FAILED",
  })
  payment_status: PaymentStatus;

  @Prop({ required: true, type: Date, default: Date.now })
  @IsDate()
  @Type(() => Date)
  payment_date: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
