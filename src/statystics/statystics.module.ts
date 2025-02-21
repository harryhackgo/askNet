import { Module } from '@nestjs/common';
import { StatysticsService } from './statystics.service';
import { StatysticsController } from './statystics.controller';

@Module({
  controllers: [StatysticsController],
  providers: [StatysticsService],
})
export class StatysticsModule {}
