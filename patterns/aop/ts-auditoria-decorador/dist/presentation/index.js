export function Audit() {
    return function (target, propertyKey, descriptor) {
        descriptor.value = async function (...args) {
            // 🛑 CLAVE: Asegurar que se use el 'this' correcto para acceder a otros servicios
            const originalMethod = descriptor.value; // ¡Ya está guardado fuera!
            try {
                // Ejecutamos el método original en el contexto (this) del Controller
                const responsePromise = originalMethod.apply(this, args);
                // ...
                // El resto del código de intercepción sigue igual:
                const result = await responsePromise;
                // ...
                console.log("Request ===> ", args);
                console.log("Resposne ===> ", result);
            }
            catch (error) {
                // ...
                throw error;
            }
        };
    };
}
