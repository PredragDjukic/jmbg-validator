import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JmbgDto } from "./dtos/jmbg.dto";
import { jmbgLength, regions } from "../utils/constants";
import { DatesService } from "../dates/dates.service";
import { GenderAndNumberDto } from "./dtos/genderAndNumber.dto";
import { PersonDto } from "./dtos/person.dto";

@Injectable()
export class ValidatorService {
  constructor(private dateService: DatesService) { }

  validate(dto: JmbgDto): PersonDto {
    this.checkJmbgLength(dto.jmbg);
    this.isOnlyDigits(dto.jmbg);

    const date: string = this.dateService.validateAndFetchDate(dto.jmbg);
    const region: string = this.validateRegion(dto.jmbg);
    const genderAndNumber: GenderAndNumberDto = this.validateGenderAndSerialNum(dto.jmbg);

    this.calculateControlNumber(dto.jmbg);

    return {
      dateOfBirth: date,
      region: region,
      gender: genderAndNumber.gender,
      serialNumber: genderAndNumber.serialNumber
    }
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

  private validateRegion(value: string): string {
    const jmbgRegion = value.substring(7, 9);
    const existingRegion = regions.get(jmbgRegion);

    if(existingRegion == undefined)
      throw new HttpException("Region is not valid", HttpStatus.BAD_REQUEST);

    return existingRegion;
  }

  private validateGenderAndSerialNum(value: string): GenderAndNumberDto {
    const genderAndNumber = Number(value.substring(9, 12));

    if(genderAndNumber == 0)
      throw new HttpException("Gender and serial number are not valid", HttpStatus.BAD_REQUEST)

    if(genderAndNumber >= 500) {
      return {
        gender: "Female",
        serialNumber: (genderAndNumber - 500) + 1
      };
    }

    return {
      gender: "Male",
      serialNumber: genderAndNumber + 1
    };
  }

  private calculateControlNumber(value: string): void {
    //Ugly code!
    const A = Number(value[0]);
    const B = Number(value[1]);
    const V = Number(value[2]);
    const G = Number(value[3]);
    const D = Number(value[4]);
    const Dj = Number(value[5]);
    const E = Number(value[6]);
    const Zh = Number(value[7]);
    const Z = Number(value[8]);
    const I = Number(value[9]);
    const J = Number(value[10]);
    const K = Number(value[11]);
    const existingControlPoint = Number(value[12]);

    let calculatedControlPoint = 11 - (( 7*(A+E) + 6*(B+Zh) + 5*(V+Z) + 4*(G+I) + 3*(D+J) + 2*(Dj+K) ) % 11);

    if(calculatedControlPoint > 9) calculatedControlPoint = 0;

    if(existingControlPoint != calculatedControlPoint)
      throw new HttpException("JMBG is not valid, control point is unappropriated", HttpStatus.BAD_REQUEST)
  }
}