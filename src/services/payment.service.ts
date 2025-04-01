import { Injectable } from '@nestjs/common';
import { Payment } from '../entities/payment.entity';
import { PaymentRepository } from '../repositories/payment.repository';
import { BaseService } from '../common/services/base.service';
import { PaymentStatus } from '../dto/payment.dto';

@Injectable()
export class PaymentService extends BaseService<Payment> {
  constructor(protected readonly paymentRepository: PaymentRepository) {
    super(paymentRepository);
  }

  async findByStatus(status: PaymentStatus): Promise<Payment[]> {
    return (this.repository as PaymentRepository).findByStatus(status);
  }

  async processPayment(data: Partial<Payment>): Promise<Payment> {
    // Add payment processing logic here
    const payment = await this.create({
      ...data,
      status: PaymentStatus.PROCESSING,
    });

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedPayment = await this.update(payment.id, {
      status: PaymentStatus.COMPLETED,
    });

    if (!updatedPayment) {
      throw new Error('Failed to update payment status');
    }

    return updatedPayment;
  }

  async getPendingPayments(): Promise<Payment[]> {
    return this.findByStatus(PaymentStatus.PENDING);
  }
} 