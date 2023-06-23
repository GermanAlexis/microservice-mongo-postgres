import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: "PRODUCT_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [
            "amqps://guxoyfiu:lb_19MjbElCebiPkQFV9jxqx5Oo8KgMY@shrimp.rmq.cloudamqp.com/guxoyfiu",
          ],
          queue: "main_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
