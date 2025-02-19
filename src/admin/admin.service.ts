import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./schemas/admin.schema";
import mongoose, { Model, Mongoose } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password != confirm_password)
      throw new BadRequestException("Passwords don't match");
    const hashed_password = await bcrypt.hash(password, 7);
    return this.adminModel.create({ ...createAdminDto, hashed_password });
  }

  async findAll() {
    return await this.adminModel.find();
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.adminModel.findById(id);
  }

  async findByEmail(email: string) {
    console.log(email);
    return await this.adminModel.findOne({ email: email });
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return await this.adminModel.findByIdAndUpdate(id, updateAdminDto);
  }

  async remove(id: string) {
    return await this.adminModel.findByIdAndDelete(id);
  }
}
