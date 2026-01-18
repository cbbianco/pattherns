# Audit Decorator - Aspect Oriented Programming (AOP) 🚀

Este módulo implementa un decorador de método personalizado para NestJS/TypeScript que facilita la interceptación de procesos de negocio (como carga de feriados, gestión de usuarios, etc.) para fines de auditoría, sin modificar la lógica del código original.

## 📋 Características

- **Desacoplamiento**: Separa la lógica de auditoría del negocio principal.
- **Reutilizable**: Puede aplicarse a cualquier método asíncrono.
- **No Intrusivo**: Utiliza el patrón Proxy/Wrapper para "envolver" la ejecución original.

## 🛠️ Instalación

1. Asegúrate de tener las dependencias necesarias en tu `package.json`:
   ```bash
   npm install
   ```

2. Compila el proyecto si es necesario:
   ```bash
   npm run build
   ```

## 📖 Uso

Para utilizar el decorador `@Audit()` en tus servicios:

1. Importa el decorador en tu archivo de servicio.
2. Aplícalo sobre el método que deseas auditar.

```typescript
import { Audit } from './path/to/audit.decorator';

export class UsersService {
  
  @Audit()
  async createUser(userDto: CreateUserDto) {
    // Lógica de negocio original
    return this.userRepository.save(userDto);
  }
}
```

## 🧩 Implementación Técnica (AOP)

El decorador funciona bajo el principio de **Aspect Oriented Programming (AOP)**, interceptando la llamada al método para ejecutar lógica adicional antes y después (o en caso de error).

### Estructura del Código

El siguiente snippet muestra cómo el decorador envuelve el método original:

```typescript
export function Audit ()  {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        
        // Wrapper que reemplaza la función original
        descriptor.value = async function (...args: any[]) {
            const originalMethod = descriptor.value; 

            try {
                // 1. ANTES: Captura de contexto (opcional)
                // console.log(`Audit: Iniciando método ${propertyKey}`);

                // 2. EJECUCIÓN: Se invoca la función original con su contexto (this) y argumentos
                const responsePromise = originalMethod.apply(this, args);
                
                // 3. ESPERA: Se aguarda el resultado
                const result = await responsePromise;
                
                // 4. DESPUÉS (Éxito): Lógica de persistencia de Log de Auditoría
                // TODO: Enviar log a BD o Elasticsearch
                // console.log(`Audit: Método ${propertyKey} completado con éxito`);
                
                return result;
            } catch (error) {
                // 5. DESPUÉS (Error): Captura de excepciones para auditar fallos
                // console.error(`Audit: Error en método ${propertyKey}`, error);
                throw error; // Re-lanza el error para no romper el flujo de la app
            }
        }
    }
}
```
