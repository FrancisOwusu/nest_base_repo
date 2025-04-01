import { Controller, Get, Post, Body, Query, Put, Param } from '@nestjs/common';
import { Payment } from '../entities/payment.entity';
import { PaymentService } from '../services/payment.service';
import { BaseController } from '../common/controllers/base.controller';
import { CreatePaymentDto, UpdatePaymentDto, PaymentResponseDto, PaymentStatus } from '../dto/payment.dto';

@Controller('payments')
export class PaymentController extends BaseController<Payment, PaymentResponseDto> {
  constructor(protected readonly paymentService: PaymentService) {
    super(paymentService, PaymentResponseDto);
  }

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<PaymentResponseDto> {
    return this.service.create(createPaymentDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentResponseDto | null> {
    const updated = await this.service.update(id, updatePaymentDto);
    return this.transformToDto(updated);
  }

  @Post('process')
  async processPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<PaymentResponseDto> {
    const payment = await (this.service as PaymentService).processPayment(createPaymentDto);
    return this.transformToDto(payment) as PaymentResponseDto;
  }

  @Get('status/:status')
  async findByStatus(@Query('status') status: PaymentStatus): Promise<PaymentResponseDto[]> {
    const payments = await (this.service as PaymentService).findByStatus(status);
    return this.transformToDtoArray(payments);
  }

  @Get('pending')
  async getPendingPayments(): Promise<PaymentResponseDto[]> {
    const payments = await (this.service as PaymentService).getPendingPayments();
    return this.transformToDtoArray(payments);
  }
} 