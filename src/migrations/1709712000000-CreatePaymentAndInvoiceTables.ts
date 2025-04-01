import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentAndInvoiceTables1709712000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create payments table
    await queryRunner.query(`
      CREATE TABLE payments (
        id VARCHAR(36) PRIMARY KEY,
        amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(3) NOT NULL,
        status ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED') NOT NULL,
        description TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create invoices table
    await queryRunner.query(`
      CREATE TABLE invoices (
        id VARCHAR(36) PRIMARY KEY,
        invoiceNumber VARCHAR(50) NOT NULL UNIQUE,
        amount DECIMAL(10,2) NOT NULL,
        dueDate TIMESTAMP NOT NULL,
        status ENUM('DRAFT', 'PENDING', 'PAID', 'OVERDUE', 'CANCELLED') NOT NULL,
        notes TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.query(`DROP TABLE IF EXISTS invoices`);
    await queryRunner.query(`DROP TABLE IF EXISTS payments`);
  }
} 