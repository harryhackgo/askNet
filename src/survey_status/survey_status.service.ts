import { Injectable } from "@nestjs/common";
import { CreateSurveyStatusDto } from "./dto/create-survey_status.dto";
import { UpdateSurveyStatusDto } from "./dto/update-survey_status.dto";
import { InjectModel } from "@nestjs/mongoose";
import { SurveyStatus } from "./schemas/survey_status.schema";
import { Model } from "mongoose";

@Injectable()
export class SurveyStatusService {
  constructor(
    @InjectModel(SurveyStatus.name)
    private surveyStatusModel: Model<SurveyStatus>
  ) {}

  create(createSurveyStatusDto: CreateSurveyStatusDto) {
    return this.surveyStatusModel.create(createSurveyStatusDto);
  }

  findAll() {
    return this.surveyStatusModel.find();
  }

  findOne(id: number) {
    return this.surveyStatusModel.findById(id);
  }

  update(id: number, updateSurveyStatusDto: UpdateSurveyStatusDto) {
    return this.surveyStatusModel.findOneAndUpdate(
      { id },
      updateSurveyStatusDto
    );
  }

  remove(id: number) {
    return this.surveyStatusModel.findOneAndDelete({ id });
  }
}
