import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ValidatorService } from "./validator.service";
import { JmbgDto } from "./dtos/jmbg.dto";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { PersonDto } from "./dtos/person.dto";

@Controller('validator')
export class ValidatorController {
  constructor(private validatorService: ValidatorService) { }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Validate' })
  @ApiBody({ type: JmbgDto, required: true })
  validateJmbg(@Body() dto: JmbgDto): PersonDto {
    return this.validatorService.validate(dto);
  }
}