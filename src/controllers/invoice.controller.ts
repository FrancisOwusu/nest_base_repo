import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceService } from '../services/invoice.service';
import { BaseController } from '../common/controllers/base.controller';
import { CreateInvoiceDto, UpdateInvoiceDto, InvoiceResponseDto } from '../dto/invoice.dto';

@Controller('invoices')
export class InvoiceController extends BaseController<Invoice, InvoiceResponseDto> {
  constructor(protected readonly invoiceService: InvoiceService) {
    super(invoiceService, InvoiceResponseDto);
  }

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<InvoiceResponseDto> {
    return this.service.create(createInvoiceDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<InvoiceResponseDto | null> {
    const updated = await this.service.update(id, updateInvoiceDto);
    return this.transformToDto(updated);
  }

  @Get('number/:invoiceNumber')
  async findByInvoiceNumber(
    @Param('invoiceNumber') invoiceNumber: string,
  ): Promise<InvoiceResponseDto | null> {
    const invoice = await (this.service as InvoiceService).findByInvoiceNumber(invoiceNumber);
    return this.transformToDto(invoice);
  }

  @Get('overdue')
  async findOverdue(): Promise<InvoiceResponseDto[]> {
    const invoices = await (this.service as InvoiceService).findOverdue();
    return this.transformToDtoArray(invoices);
  }

  @Post('generate')
  async generateInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<InvoiceResponseDto> {
    const invoice = await (this.service as InvoiceService).generateInvoice(createInvoiceDto);
    return this.transformToDto(invoice) as InvoiceResponseDto;
  }

  @Put(':id/mark-paid')
  async markAsPaid(@Param('id') id: string): Promise<InvoiceResponseDto | null> {
    const invoice = await (this.service as InvoiceService).markAsPaid(id);
    return this.transformToDto(invoice);
  }

  @Get('unpaid')
  async getUnpaidInvoices(): Promise<InvoiceResponseDto[]> {
    const invoices = await (this.service as InvoiceService).getUnpaidInvoices();
    return this.transformToDtoArray(invoices);
  }
} 