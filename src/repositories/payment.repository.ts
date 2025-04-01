import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { BaseRepository } from '../common/repositories/base.repository';
import { PaymentStatus } from '../dto/payment.dto';

@Injectable()
export class PaymentRepository extends BaseRepository<Payment> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {
    super(paymentRepository);
  }

  // Add payment-specific methods here
  async findByStatus(status: PaymentStatus): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { status } });
  }
} 