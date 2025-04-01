import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Payment } from './entities/payment.entity';
import { Invoice } from './entities/invoice.entity';
import { PaymentRepository } from './repositories/payment.repository';
import { InvoiceRepository } from './repositories/invoice.repository';
import { PaymentService } from './services/payment.service';
import { InvoiceService } from './services/invoice.service';
import { PaymentController } from './controllers/payment.controller';
import { InvoiceController } from './controllers/invoice.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjsapp',
      entities: [Payment, Invoice],
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
      logging: true,
      charset: 'utf8mb4'
    }),
    TypeOrmModule.forFeature([Payment, Invoice]),
  ],
  controllers: [AppController, PaymentController, InvoiceController],
  providers: [
    AppService,
    PaymentRepository,
    InvoiceRepository,
    PaymentService,
    InvoiceService,
  ],
})
export class AppModule {}
