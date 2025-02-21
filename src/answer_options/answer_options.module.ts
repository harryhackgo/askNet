import { Module } from '@nestjs/common';
import { AnswerOptionsService } from './answer_options.service';
import { AnswerOptionsController } from './answer_options.controller';

@Module({
  controllers: [AnswerOptionsController],
  providers: [AnswerOptionsService],
})
export class AnswerOptionsModule {}
