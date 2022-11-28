import { Injectable } from "@nestjs/common";
import { JmbgDto } from "./dtos/jmbg.dto";
import { jmbgLength } from "../utils/constants";
import { DatesService } from "../dates/dates.service";

@Injectable()
export class ValidatorService {
  constructor(private dateService: DatesService) {
  }

  validate(dto: JmbgDto): string {
    this.checkJmbgLength(dto.jmbg);
    this.dateService.validateDate(dto.jmbg);

    return 'Jmbg is valid';
  }

  private checkJmbgLength(value: string): void {
    if(value.length != jmbgLength)
      throw Error("Jmbg length is not valid");
  }
}