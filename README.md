# Virtual Vending Machine

A full-stack vending machine application built with React frontend and Spring Boot backend.

## Features

- **User Authentication**: Login and registration with SHA-256 password hashing
- **Product Management**: Browse products, view stock, and manage inventory (Admin)
- **Shopping Cart**: Add items, view cart, and checkout
- **Transaction History**: All purchases are recorded in the database
- **Admin Dashboard**: Manage products (Create, Read, Update, Delete)
- **Stock Validation**: Real-time stock checking and validation
- **Balance Management**: User balance tracking and updates

## Tech Stack

### Frontend
- React 19
- JavaScript/ES6
- CSS3

### Backend
- Spring Boot 3.2.1
- Java 17
- Spring Data JPA
- MySQL Database
- RESTful API

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js and npm
- MySQL Server
- Maven (or use Maven Wrapper included)

### Database Setup

1. Start MySQL server
2. Run the consolidated database script:
   ```sql
   mysql -u root -p < database/0_consolidated_database.sql
   ```
   Or use the individual scripts in the `database/` folder.

3. Update database credentials in `vending-machine-backend/vending-machine-backend/src/main/resources/application.properties` if needed.

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd vending-machine-backend/vending-machine-backend
   ```

2. Build the project:
   ```bash
   ./mvnw clean package
   ```

3. Run the backend:
   ```bash
   java -jar target/vending-machine-backend-0.0.1-SNAPSHOT.jar
   ```
   Or use the batch file:
   ```bash
   START-BACKEND.bat
   ```

   Backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   Frontend will start on `http://localhost:3000`

## Default Credentials

### Admin
- Username: `admin`
- Password: `admin123`

### Users
- Username: `demo_user`
- Password: `user123`

Additional test users:
- `john_doe` / `user123`
- `jane_smith` / `user123`

## API Endpoints

### Authentication
- `POST /api/user/auth/login` - User login
- `POST /api/user/auth/register` - User registration
- `POST /api/admin/auth/login` - Admin login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Purchase
- `POST /api/purchase/checkout` - Checkout cart items

## Project Structure

```
Vending_Machine/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service layer
│   │   └── App.js           # Main application component
│   └── package.json
├── vending-machine-backend/  # Spring Boot backend
│   └── vending-machine-backend/
│       ├── src/main/java/
│       │   └── com/vending/machine/
│       │       ├── controller/    # REST controllers
│       │       ├── service/       # Business logic
│       │       ├── model/         # Entity models
│       │       ├── repository/    # Data access layer
│       │       └── dto/           # Data transfer objects
│       └── pom.xml
└── database/                # Database setup scripts
    ├── 0_consolidated_database.sql
    └── insert-users.sql
```

## Development

### Building the Project

**Backend:**
```bash
cd vending-machine-backend/vending-machine-backend
./mvnw clean package
```

**Frontend:**
```bash
cd frontend
npm run build
```

## License

This project is for educational purposes.

## Author

Michael Leahey

