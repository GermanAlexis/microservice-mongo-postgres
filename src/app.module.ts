import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import typeormModule from './configuration/typeorm.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductModule, typeormModule],
})
export class AppModule {}
