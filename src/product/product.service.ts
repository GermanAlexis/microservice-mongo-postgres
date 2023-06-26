/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRespository: Repository<Product>,
    @Inject("PRODUCT_SERVICE")
    private readonly client: ClientProxy
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRespository.create(createProductDto);
    try {
      const prodductSaved = await this.productRespository.save(product);
      if (prodductSaved) {
        this.client.emit("product_created", prodductSaved);
      }
      return prodductSaved;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<[Product[], number]> {
    return this.productRespository.findAndCount();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRespository.findOneBy({ productId: id });
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRespository.preload({
      id: productId,
      ...updateProductDto,
    });

    try {
      const productUpdated = this.productRespository.save(productToUpdate);
      if (productUpdated) {
        this.client.emit("product_updated", productUpdated);
      }
      return productUpdated;
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    const productRemove = this.findOne(id);
    try {
      if (productRemove) {
        this.client.emit("product_removed", productRemove);
      }
      return productRemove;
    } catch (error) {
      console.log(error);
    }
    return await this.productRespository.delete(id);
  }
}
