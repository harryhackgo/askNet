import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatysticsService } from './statystics.service';
import { CreateStatysticDto } from './dto/create-statystic.dto';
import { UpdateStatysticDto } from './dto/update-statystic.dto';

@Controller('statystics')
export class StatysticsController {
  constructor(private readonly statysticsService: StatysticsService) {}

  @Post()
  create(@Body() createStatysticDto: CreateStatysticDto) {
    return this.statysticsService.create(createStatysticDto);
  }

  @Get()
  findAll() {
    return this.statysticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statysticsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatysticDto: UpdateStatysticDto) {
    return this.statysticsService.update(+id, updateStatysticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statysticsService.remove(+id);
  }
}
