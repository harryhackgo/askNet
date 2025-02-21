import { PartialType } from '@nestjs/swagger';
import { CreateStatysticDto } from './create-statystic.dto';

export class UpdateStatysticDto extends PartialType(CreateStatysticDto) {}
