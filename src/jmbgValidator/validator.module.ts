import { Module } from '@nestjs/common';
import { ValidatorController } from "./validator.controller";
import { ValidatorService } from "./validator.service";
import { DatesModule } from "../dates/dates.module";

@Module({
  imports: [DatesModule],
  controllers: [ValidatorController],
  providers: [ValidatorService],
})
export class ValidatorModule {}