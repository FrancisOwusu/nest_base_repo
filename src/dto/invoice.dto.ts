import { IsNumber, IsString, IsOptional, IsEnum, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseDto } from '../common/dto/base.dto';

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

export class CreateInvoiceDto {
  @IsNumber()
  @Min(0)
  amount: number;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateInvoiceDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  amount?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dueDate?: Date;

  @IsEnum(InvoiceStatus)
  @IsOptional()
  status?: InvoiceStatus;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class InvoiceResponseDto extends BaseDto {
  @IsString()
  invoiceNumber: string;

  @IsNumber()
  amount: number;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;

  @IsString()
  @IsOptional()
  notes?: string;
} 