export function Audit ()  {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        //TODO Argumentos de la función
        descriptor.value = async function (...args: any[]) {
            const originalMethod = descriptor.value;

            try {
                //TODO Representa la función que s está invocando , debe invocarse para que el flujo pueda continuar.
                const responsePromise = originalMethod.apply(this, args);
                await responsePromise;

            } catch (error) {
                throw error;
            }
        }
    }
}
