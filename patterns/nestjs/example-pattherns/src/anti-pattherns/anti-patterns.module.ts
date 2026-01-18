import { Module } from '@nestjs/common';
import { AntiPatthernsController } from './controller/anti-pattherns.controller';
import { AbuseIfController } from './controller/abuse-if.controller';

@Module({
    controllers: [
        AntiPatthernsController,
        AbuseIfController,
    ],
})
export class AntiPatternsModule { }
