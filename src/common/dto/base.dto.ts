import { IsUUID, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseDto {
  @IsUUID()
  id?: string;

  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
} 