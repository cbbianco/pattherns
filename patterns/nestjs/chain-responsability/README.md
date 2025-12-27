# User Roles Management - Chain of Responsibility & Template Method

Este módulo gestiona la creación y persistencia de usuarios basándose en una jerarquía dinámica de roles. Utiliza patrones de diseño avanzados para garantizar la escalabilidad y el cumplimiento de los requerimientos de auditoría.

## 🛠️ Patrones de Diseño Implementados

### 1. Chain of Responsibility (CoR)
La lógica de decisión sobre qué rol procesar no reside en un `if/else` gigante, sino en una cadena de objetos independientes.
- **RolesManager:** Actúa como el cliente que orquesta la cadena.
- **RolesChainInterface:** Define la estructura de cada eslabón (`handlerRole`, `nextRole`, `position`).
- **Eslabones:** `RolesAdminChain` y `RolesSuperadminChain` procesan la solicitud o la delegan al siguiente.

### 2. Template Method
Utilizado para la generación de contextos de auditoría específicos por cada rol.
- **Clase Abstracta `GeneratePayload`:** Define el contrato para la creación de metadatos.
- **Implementación:** Cada cadena extiende esta clase y personaliza el JSON de auditoría (por ejemplo, el `level` o la estructura del `date`).

## ⚙️ Flujo de Ejecución

1. **Registro:** En `UserService`, se registran las clases de la cadena en el `RolesManager`.
2. **Inicialización:** Durante el `onModuleInit`, el manager ordena los eslabones según su `position()`.
3. **Procesamiento:**
    - El `UserController` recibe el `UserDto`.
    - El `RolesManager` inicia el recorrido en el primer eslabón.
    - Si el `levelRol` coincide, el eslabón genera su payload, persiste en el `UserRepository` y retorna.

## 📋 Ejemplo de Contexto de Auditoría Generado

Dependiendo del eslabón que procese la solicitud, el campo `contextoAuditoria` en la base de datos variará:

**Para Admin:**
```json
{
  "chain": "RolesAdminChain",
  "level": 2,
  "date": "2025-12-27T..."
}
