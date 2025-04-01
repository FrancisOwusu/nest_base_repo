import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { BaseRepository } from '../common/repositories/base.repository';
import { InvoiceStatus } from '../dto/invoice.dto';

@Injectable()
export class InvoiceRepository extends BaseRepository<Invoice> {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {
    super(invoiceRepository);
  }

  // Add invoice-specific methods here
  async findByInvoiceNumber(invoiceNumber: string): Promise<Invoice | null> {
    return this.invoiceRepository.findOne({ where: { invoiceNumber } });
  }

  async findOverdue(): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      where: {
        dueDate: LessThan(new Date()),
        status: InvoiceStatus.PENDING,
      },
    });
  }

  async findByStatus(status: InvoiceStatus): Promise<Invoice[]> {
    return this.invoiceRepository.find({ where: { status } });
  }
} 