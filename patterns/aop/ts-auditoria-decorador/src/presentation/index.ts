export function Audit ()  {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = async function (...args: any[]) {
            const originalMethod = descriptor.value; // ¡Ya está guardado fuera!

            try {
                const responsePromise = originalMethod.apply(this, args);

                const result = await responsePromise;

                console.log("Request ===> ", args);

                console.log("Resposne ===> ", result);

            } catch (error) {
                throw error;
            }
        }
    }
}
