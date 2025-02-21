import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SurveyStatusDocument = HydratedDocument<SurveyStatus>;

@Schema()
export class SurveyStatus {
  @Prop()
  participant_id: number;

  @Prop()
  survey_id: number;

  @Prop()
  status: string;

  @Prop()
  last_question_id: number;

  @Prop()
  progress: string;
}

export const SurveyStatusSchema = SchemaFactory.createForClass(SurveyStatus);
