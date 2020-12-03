import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlertDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  exchange: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ticker: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  action: string;
}
