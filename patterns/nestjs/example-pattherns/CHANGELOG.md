# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-01-18

### Added
- **Chain of Responsibility Pattern**: Implementation of a role validation chain (`RolesManager`, `RolesAdminChain`, `RolesSuperadminChain`) in `UserService`.
- **Parameter Object Pattern**: Demonstration of refactoring a long parameter list into a DTO in `AntiPatthernsController`.
- **Anti-Pattern Example**: "Excessive Parameters" (Long Parameter List) example in `AntiPatthernsController` to demonstrate readability/maintainability issues.
- Basic NestJS project structure with MySQL TypeORM configuration.
