# Audit Decorator - Aspect Oriented Programming (AOP) 🚀

Este módulo implementa un decorador de método personalizado para NestJS que permite la interceptación de procesos de negocio (como la carga de feriados o gestión de usuarios) sin modificar el código original.

## 🛠️ Implementación Técnica (AOP)

El decorador `@Audit()` utiliza el patrón de diseño **Proxy/Wrapper** para envolver la función original y capturar su ejecución.

### Estructura del Código

```typescript
export function Audit ()  {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        
        // TODO: Captura de los argumentos de la función original. 
        // Permite registrar parámetros como el DTO de usuario o el archivo CSV.
        descriptor.value = async function (...args: any[]) {
            const originalMethod = descriptor.value; 

            try {
                // TODO: Representa la función que se está invocando. 
                // Debe invocarse con .apply(this, args) para que el flujo del servicio original continúe.
                const responsePromise = originalMethod.apply(this, args);
                
                // TODO: Espera la resolución de la promesa (resultado del servicio).
                // Aquí es donde se capturaría el resultado exitoso para el log de auditoría.
                const result = await responsePromise;
                
                // TODO: Lógica de persistencia de Log.
                // Aquí se debe integrar el envío del log a la base de datos o Elasticsearch.
                
                return result;
            } catch (error) {
                // TODO: Captura de excepciones. 
                // Permite auditar intentos fallidos de operación (ej. error 400 por CSV inválido).
                throw error;
            }
        }
    }
}
