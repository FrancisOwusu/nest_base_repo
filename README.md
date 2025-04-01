# NestJS Payment and Invoice Management System

A robust NestJS application for managing payments and invoices with TypeORM and MySQL, featuring JWT authentication and a modern Vue.js frontend.

## Features

- User authentication with JWT
- Payment processing and management
- Invoice generation and tracking
- MySQL database integration with TypeORM
- RESTful API endpoints with authentication guards
- Type-safe DTOs and entities
- Base repository and service patterns
- Migration support
- CORS enabled for frontend integration
- Modern UI with Vue.js frontend

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

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=nestjsapp

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d

# Server Configuration
PORT=3000
NODE_ENV=development
```

4. Configure your MySQL database:
- Create a database named `nestjsapp`
- The application will automatically create the necessary tables on first run

5. Run migrations:
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

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Protected Routes

All payment and invoice routes require authentication. Include the JWT token in the Authorization header:
```http
Authorization: Bearer your-jwt-token
```

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

#### Get All Payments
```http
GET /payments
```

#### Get Payment by ID
```http
GET /payments/:id
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

#### Get All Invoices
```http
GET /invoices
```

#### Get Invoice by ID
```http
GET /invoices/:id
```

#### Mark Invoice as Paid
```http
PUT /invoices/:id/mark-paid
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
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── strategies/
│       └── jwt.strategy.ts
├── common/
│   ├── controllers/
│   ├── interfaces/
│   ├── repositories/
│   └── services/
├── controllers/
│   ├── payment.controller.ts
│   └── invoice.controller.ts
├── dto/
│   ├── auth.dto.ts
│   ├── payment.dto.ts
│   └── invoice.dto.ts
├── entities/
│   ├── user.entity.ts
│   ├── payment.entity.ts
│   └── invoice.entity.ts
├── repositories/
├── services/
├── migrations/
├── app.module.ts
└── main.ts
```

## Database Schema

### Users Table
- id (UUID, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- firstName (String)
- lastName (String)
- role (Enum: USER, ADMIN)
- isActive (Boolean)
- createdAt (Date)
- updatedAt (Date)

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

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- CORS is enabled and configured for frontend integration
- Environment variables are used for sensitive data
- Production mode disables synchronize option for TypeORM

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
