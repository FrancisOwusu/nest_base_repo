import { Injectable } from '@nestjs/common';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { BaseService } from '../common/services/base.service';
import { InvoiceStatus } from '../dto/invoice.dto';

@Injectable()
export class InvoiceService extends BaseService<Invoice> {
  constructor(protected readonly invoiceRepository: InvoiceRepository) {
    super(invoiceRepository);
  }

  async findByInvoiceNumber(invoiceNumber: string): Promise<Invoice | null> {
    return (this.repository as InvoiceRepository).findByInvoiceNumber(invoiceNumber);
  }

  async findOverdue(): Promise<Invoice[]> {
    return (this.repository as InvoiceRepository).findOverdue();
  }

  async generateInvoice(data: Partial<Invoice>): Promise<Invoice> {
    const invoice = await this.create({
      ...data,
      status: InvoiceStatus.DRAFT,
      invoiceNumber: `INV-${Date.now()}`,
    });

    return invoice;
  }

  async markAsPaid(id: string): Promise<Invoice | null> {
    const updatedInvoice = await this.update(id, {
      status: InvoiceStatus.PAID,
    });

    if (!updatedInvoice) {
      throw new Error('Failed to update invoice status');
    }

    return updatedInvoice;
  }

  async getUnpaidInvoices(): Promise<Invoice[]> {
    return (this.repository as InvoiceRepository).findByStatus(InvoiceStatus.PENDING);
  }
} 