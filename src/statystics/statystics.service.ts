import { Injectable } from '@nestjs/common';
import { CreateStatysticDto } from './dto/create-statystic.dto';
import { UpdateStatysticDto } from './dto/update-statystic.dto';

@Injectable()
export class StatysticsService {
  create(createStatysticDto: CreateStatysticDto) {
    return 'This action adds a new statystic';
  }

  findAll() {
    return `This action returns all statystics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statystic`;
  }

  update(id: number, updateStatysticDto: UpdateStatysticDto) {
    return `This action updates a #${id} statystic`;
  }

  remove(id: number) {
    return `This action removes a #${id} statystic`;
  }
}
