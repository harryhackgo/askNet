import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import mongoose from "mongoose";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get("email")
  findByEmail(@Query("email") email: string) {
    return this.adminService.findByEmail(email);
  }

  @Get(":id")
  findOne(@Param("id") id: mongoose.Schema.Types.ObjectId) {
    return this.adminService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(id);
  }
}
