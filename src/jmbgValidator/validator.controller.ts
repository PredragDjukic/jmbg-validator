import { Body, Controller, Post } from "@nestjs/common";
import { ValidatorService } from "./validator.service";
import { JmbgDto } from "./dtos/jmbg.dto";

@Controller('validator')
export class ValidatorController {
  constructor(private validatorService: ValidatorService) { }

  @Post()
  validateJmbg(@Body() dto: JmbgDto) {
    return this.validatorService.validate(dto);
  }
}