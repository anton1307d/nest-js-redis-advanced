import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';
import { BullModule } from '@nestjs/bull';
import { OptimizeProcessor } from './optimize.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
    }),
  ],
  providers: [OptimizeProcessor],
  exports: [],
  controllers: [OptimizeController],
})
export class OptimizeModule {}
