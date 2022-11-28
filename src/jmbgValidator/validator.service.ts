import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JmbgDto } from "./dtos/jmbg.dto";
import { jmbgLength, regions } from "../utils/constants";
import { DatesService } from "../dates/dates.service";

@Injectable()
export class ValidatorService {
  constructor(private dateService: DatesService) { }

  validate(dto: JmbgDto): string {
    this.checkJmbgLength(dto.jmbg);
    this.isOnlyDigits(dto.jmbg);
    this.dateService.validateDate(dto.jmbg);
    this.validateRegion(dto.jmbg);
    this.validateGenderAndSerialNum(dto.jmbg);

    return 'Jmbg is valid';
  }

  private checkJmbgLength(value: string): void {
    if(value.length != jmbgLength)
      throw new HttpException("Jmbg length is not valid", HttpStatus.BAD_REQUEST);
  }

  private isOnlyDigits(value: string): void {
    const isOnlyDigits = /^\d+$/.test(value);

    if(!isOnlyDigits)
      throw new HttpException("Jmbg content is not valid", HttpStatus.BAD_REQUEST);
  }

  private validateRegion(value: string): void {
    const jmbgRegion = value.substring(7, 9);
    const existingRegion = regions.get(jmbgRegion);

    if(existingRegion == undefined)
      throw new HttpException("Region is not valid", HttpStatus.BAD_REQUEST);
  }

  private validateGenderAndSerialNum(value: string): void {
    const genderAndNumber = value.substring(9, 12);

    if(Number(genderAndNumber) == 0)
      throw new HttpException("Gender and serial number are not valid", HttpStatus.BAD_REQUEST)
  }
}