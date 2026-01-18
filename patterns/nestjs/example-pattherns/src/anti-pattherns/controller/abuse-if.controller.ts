import { Controller, Get, Query } from '@nestjs/common';

@Controller('anti-patterns')
export class AbuseIfController {

    /**
     * ANTI-PATRÓN: Abuso de If / Switch (Condition Hell)
     * 
     * PROBLEMA:
     * Este método demuestra cómo la lógica de negocio se complejiza innecesariamente
     * al anidar múltiples sentencias condicionales.
     * 
     * - Dificulta la lectura: Es difícil seguir el flujo de ejecución.
     * - Viola Principio Open/Closed: Para agregar un nuevo tipo de cliente o regla,
     *   debemos modificar este código existente, introduciendo riesgo de bugs.
     * - Difícil de probar: La combinatoria de caminos requiere muchos casos de prueba.
     */
    @Get('calculate-discount')
    calculateDiscount(
        @Query('userType') userType: string,
        @Query('years') years: number,
        @Query('amount') amount: number
    ) {
        let discount = 0;

        if (userType === 'premium') {
            if (years > 5) {
                if (amount > 1000) {
                    discount = 20; // Premium veterano comprando mucho
                } else {
                    discount = 15; // Premium veterano compra normal
                }
            } else {
                if (amount > 500) {
                    discount = 10;
                } else {
                    discount = 5;
                }
            }
        } else if (userType === 'regular') {
            if (years > 3) {
                discount = 5;
            } else {
                // Lógica arbitraria extra
                if (amount > 2000) {
                    discount = 3;
                } else {
                    discount = 0;
                }
            }
        } else if (userType === 'new') {
            // Switch innecesario mezclado con ifs
            switch (true) {
                case amount > 100:
                    discount = 2;
                    break;
                default:
                    discount = 0;
            }
        } else {
            return 'Tipo de usuario desconocido';
        }

        return {
            userType,
            finalAmount: amount - (amount * discount / 100),
            discountApplied: `${discount}%`
        };
    }
}
