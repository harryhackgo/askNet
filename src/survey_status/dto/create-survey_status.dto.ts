import {
  IsInt,
  IsPositive,
  IsString,
  IsEnum,
  IsUUID,
  Matches,
  Min,
  Max,
  IsNotEmpty,
} from "class-validator";

enum SurveyStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export class CreateSurveyStatusDto {
  @IsInt()
  @IsPositive()
  participant_id: number;

  @IsInt()
  @IsPositive()
  survey_id: number;

  @IsEnum(SurveyStatus, {
    message: "Status must be one of: NOT_STARTED, IN_PROGRESS, COMPLETED",
  })
  status: SurveyStatus;

  @IsInt()
  @IsPositive()
  last_question_id: number;

  @Matches(/^(100|[1-9]?[0-9])%$/, {
    message: 'Progress must be a percentage (e.g., "0%", "45%", "100%")',
  })
  progress: string;
}
