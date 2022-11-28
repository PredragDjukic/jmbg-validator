import { Module } from '@nestjs/common';
import { ValidatorModule } from "./jmbgValidator/validator.module";
import { DatesModule } from './dates/dates.module';

@Module({
  imports: [ValidatorModule, DatesModule]
})
export class AppModule {}
