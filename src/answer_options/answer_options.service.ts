import { Injectable } from '@nestjs/common';
import { CreateAnswerOptionDto } from './dto/create-answer_option.dto';
import { UpdateAnswerOptionDto } from './dto/update-answer_option.dto';

@Injectable()
export class AnswerOptionsService {
  create(createAnswerOptionDto: CreateAnswerOptionDto) {
    return 'This action adds a new answerOption';
  }

  findAll() {
    return `This action returns all answerOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answerOption`;
  }

  update(id: number, updateAnswerOptionDto: UpdateAnswerOptionDto) {
    return `This action updates a #${id} answerOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} answerOption`;
  }
}
