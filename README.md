# NestJS Payment and Invoice Management System

A robust NestJS application for managing payments and invoices with TypeORM and MySQL.

## Features

- Payment processing and management
- Invoice generation and tracking
- MySQL database integration with TypeORM
- RESTful API endpoints
- Type-safe DTOs and entities
- Base repository and service patterns
- Migration support

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nestjsdb
```

2. Install dependencies:
```bash
npm install
```

3. Configure your MySQL database:
- Create a database named `nestjsapp`
- Update the database configuration in `src/app.module.ts` if needed:
```typescript
{
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nestjsapp',
  // ... other options
}
```

4. Run migrations:
```bash
npm run migration:run
```

## Running the Application

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Payments

#### Create Payment
```http
POST /payments
Content-Type: application/json

{
  "amount": 100.50,
  "currency": "USD",
  "description": "Test payment"
}
```

#### Process Payment
```http
POST /payments/process
Content-Type: application/json

{
  "amount": 200,
  "currency": "EUR",
  "description": "Process this payment"
}
```

#### Get Payment by ID
```http
GET /payments/:id
```

#### Get Payments by Status
```http
GET /payments/status/:status
```

#### Get Pending Payments
```http
GET /payments/pending
```

#### Update Payment
```http
PUT /payments/:id
Content-Type: application/json

{
  "amount": 150.75,
  "currency": "USD",
  "description": "Updated payment"
}
```

#### Delete Payment
```http
DELETE /payments/:id
```

### Invoices

#### Generate Invoice
```http
POST /invoices/generate
Content-Type: application/json

{
  "amount": 500,
  "dueDate": "2024-04-30T00:00:00Z",
  "notes": "Test invoice"
}
```

#### Get Invoice by ID
```http
GET /invoices/:id
```

#### Get Invoice by Number
```http
GET /invoices/number/:invoiceNumber
```

#### Get Overdue Invoices
```http
GET /invoices/overdue
```

#### Mark Invoice as Paid
```http
PUT /invoices/:id/mark-paid
```

#### Get Unpaid Invoices
```http
GET /invoices/unpaid
```

#### Update Invoice
```http
PUT /invoices/:id
Content-Type: application/json

{
  "amount": 600,
  "dueDate": "2024-05-15T00:00:00Z",
  "notes": "Updated invoice"
}
```

#### Delete Invoice
```http
DELETE /invoices/:id
```

## Project Structure

```
src/
├── common/
│   ├── controllers/
│   │   └── base.controller.ts
│   ├── interfaces/
│   │   └── base.entity.interface.ts
│   ├── repositories/
│   │   └── base.repository.ts
│   └── services/
│       └── base.service.ts
├── controllers/
│   ├── payment.controller.ts
│   └── invoice.controller.ts
├── dto/
│   ├── payment.dto.ts
│   └── invoice.dto.ts
├── entities/
│   ├── payment.entity.ts
│   └── invoice.entity.ts
├── repositories/
│   ├── payment.repository.ts
│   └── invoice.repository.ts
├── services/
│   ├── payment.service.ts
│   └── invoice.service.ts
├── migrations/
├── app.module.ts
└── main.ts
```

## Database Schema

### Payments Table
- id (UUID, Primary Key)
- amount (Decimal)
- currency (String)
- status (Enum: PENDING, PROCESSING, COMPLETED, FAILED)
- description (String, Optional)
- createdAt (Date)
- updatedAt (Date)

### Invoices Table
- id (UUID, Primary Key)
- invoiceNumber (String, Unique)
- amount (Decimal)
- dueDate (Date)
- status (Enum: DRAFT, PENDING, PAID, CANCELLED)
- notes (String, Optional)
- createdAt (Date)
- updatedAt (Date)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
