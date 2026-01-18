# NestJS Patterns & Anti-Patterns Example

This project is an educational sandbox designed to demonstrate software design patterns and common anti-patterns within a NestJS ecosystem. It serves as a practical guide for developers to understand specific implementation scenarios and best practices.

## 📚 Patterns & Anti-Patterns Covered

### 1. Chain of Responsibility (Design Pattern)
**Goal:** Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.

- **Implementation**: The role validation logic for users is decoupled into a chain of handlers.
- **Key Components**:
  - `RolesManager`: Orchestrates the chain.
  - `RolesAdminChain` & `RolesSuperadminChain`: Concrete handlers processing user roles effectively.
- **Location**: `src/user/service/roles/`

### 2. Parameter Object (Refactoring Pattern) vs. Excessive Parameters (Anti-Pattern)
**Goal:** Group multiple parameters that naturally belong together into a single object (DTO).

- **Anti-Pattern (The Problem)**:
  - `searchObjectsAntiPattern`: A method signature with a long list of individual arguments (`objectType`, `selectedObject`, `idNumber`, etc.), making the code hard to read and maintain.
- **Pattern (The Solution)**:
  - `searchObjectsWithOutAntiPattern`: The same functionality refactored to use a `SearchObjectsDto`, handling all filters in a single, structured object.
- **Location**: `src/anti-pattherns/controller/anti-pattherns.controller.ts`

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Database

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your database connection in `src/app.module.ts` (or use Environment Variables).

### Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## 📝 License

This project is [UNLICENSED](LICENSE).
