import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "./schemas/payment.schema";
import { Model } from "mongoose";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  findAll() {
    return this.paymentModel.findOne();
  }

  findOne(id: number) {
    return this.paymentModel.findOne({ id });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentModel.findOneAndUpdate({ id }, updatePaymentDto);
  }

  remove(id: number) {
    return this.paymentModel.findOneAndDelete({ id });
  }
}
