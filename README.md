# SupplierPortal - Supply Network Management Platform

A comprehensive web application for managing supply network entities, questionnaires, and performance metrics in the fashion and manufacturing sectors.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- .NET 9.0 SDK
- Docker & Docker Compose
- Git

### Backend Setup
```bash
# Navigate to API directory
cd api/SupplierPortal.API

# Start infrastructure services (SQL Server & OpenFGA)
docker-compose up -d

# Initialize OpenFGA authorization
cd Scripts
./init-openfga.sh
# Save the output Store ID and Model ID

# Update appsettings.Development.json with OpenFGA configuration
# Add the Store ID and Model ID from the previous step

# Restore dependencies
cd ..
dotnet restore

# Run migrations
dotnet ef database update

# Start the API
dotnet run
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd front

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application
- Frontend: http://localhost:4280
- API: http://localhost:5000
- OpenFGA Playground: http://localhost:8082

## 🏗️ Architecture Overview

### Technology Stack
- **Backend**: .NET 9, Entity Framework Core, MediatR (CQRS)
- **Frontend**: React 18, TypeScript, Material-UI, Redux
- **Database**: Azure SQL Server
- **Authorization**: OpenFGA (Fine-grained permissions)
- **Authentication**: Keycloak (OIDC)
- **Infrastructure**: Docker, AWS ECS

### Key Features
- 🔐 **Role-Based Access Control** with OpenFGA
- 📊 Supply Network Entity Management
- 📋 Dynamic Questionnaire System
- 📈 KPI & Performance Tracking
- 🌍 Multi-language Support (EN, DE, IT)
- 📱 Responsive Design

### User Roles
- **Administrator**: Full system access
- **Supply Chain Operator**: Entity and assignment management
- **Sustainability Manager**: Template and questionnaire management
- **Network Actor**: External suppliers with limited access

## 📁 Project Structure

```
SupplierPortal/
├── api/                    # Backend (.NET Core)
│   ├── SupplierPortal.API/        # Web API
│   ├── SupplierPortal.Application/ # Business logic (CQRS)
│   ├── SupplierPortal.Domain/     # Domain models
│   └── SupplierPortal.Infrastructure/ # Data access
├── front/                  # Frontend (React)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Route pages
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom React hooks
│   │   └── stores/       # Redux stores
└── docs/                  # Documentation

```

## 🔒 Security & Authorization

The application uses OpenFGA for fine-grained authorization:

- **Menu Protection**: Dynamic menu visibility based on roles
- **Route Protection**: Protected routes with permission checks
- **API Protection**: Role and permission-based endpoint security
- **Data-Level Security**: Region and ownership-based filtering

See [RBAC Implementation Guide](docs/development/security/rbac-implementation.md) for details.

## 📚 Documentation

- [Project Overview](docs/project/project-overview.md)
- [RBAC Implementation](docs/development/security/rbac-implementation.md)
- [API Documentation](docs/development/api/api-documentation.md)
- [Design System](docs/design/design-system/design-system.md)
- [Debugging Guide](docs/development/debugging/debug-guide.md)

## 🧪 Testing

### Backend Tests
```bash
cd api
dotnet test
```

### Frontend Tests
```bash
cd front
npm test
npm run test:coverage
```

## 🚢 Deployment

The application is designed for containerized deployment:

1. Build Docker images
2. Push to container registry
3. Deploy to AWS ECS or Kubernetes
4. Configure environment variables
5. Run database migrations

## 🤝 Contributing

1. Create feature branch from master
2. Implement changes following coding standards
3. Write tests for new functionality
4. Update documentation
5. Create pull request

## 📄 License

This project is proprietary software owned by REMIRA Group.