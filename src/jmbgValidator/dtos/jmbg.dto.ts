import { ApiProperty } from "@nestjs/swagger";

export class JmbgDto {
  @ApiProperty()
  jmbg: string;
}