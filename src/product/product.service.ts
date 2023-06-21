/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRespository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRespository.create(createProductDto);
    return await this.productRespository.save(product);
  }

  async findAll(): Promise<[Product[], number]> {
    return this.productRespository.findAndCount();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRespository.findOneBy({ id });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRespository.preload({
      id,
      ...updateProductDto,
    });
    return this.productRespository.save(productToUpdate);
  }

  async remove(id: string) {
    const productRemove = this.findOne(id);
    return await this.productRespository.delete(id);
  }
}
