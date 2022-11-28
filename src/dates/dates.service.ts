import { Injectable } from "@nestjs/common";

@Injectable()
export class DatesService {
  validateDate(jmbg: string): void {
    if(this.isDateValid(jmbg) == false)
      throw new Error("JMBG Date is not valid");
  }

  private isDateValid(jmbg: string): boolean {
    const [day, month, year] = this.fetchDatePartsFromJMBG(jmbg);

    const date = new Date(year, month -1, day, 12);

    if (date.getFullYear() == year && date.getMonth() + 1 == month && date.getDate() == day) {
      return true;
    }

    return false;
  }

  private fetchDatePartsFromJMBG(jmbg: string) {
    const day = jmbg.substring(0, 2);
    const month = jmbg.substring(2, 4);
    let year = jmbg.substring(4, 7);

    Number(year) > 900 ?
      year = '1' + year :
      year = '2' + year

    return [Number(day), Number(month), Number(year)] as const;
  }
}