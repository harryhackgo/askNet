import {
  IsInt,
  IsPositive,
  IsNumber,
  IsEnum,
  IsDate,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export class CreatePaymentDto {
  @IsInt()
  @IsPositive()
  participant_id: number;

  @IsInt()
  @IsPositive()
  survey_id: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEnum(PaymentStatus, {
    message: "Payment status must be PENDING, COMPLETED, or FAILED",
  })
  payment_status: PaymentStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  payment_date?: Date;
}
