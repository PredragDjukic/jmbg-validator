import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ValidatorService } from "./validator.service";
import { JmbgDto } from "./dtos/jmbg.dto";

@Controller('validator')
export class ValidatorController {
  constructor(private validatorService: ValidatorService) { }

  @Post()
  @HttpCode(200)
  validateJmbg(@Body() dto: JmbgDto) {
    return this.validatorService.validate(dto);
  }
}