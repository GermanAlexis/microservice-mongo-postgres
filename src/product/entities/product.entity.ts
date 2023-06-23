import {
  AfterInsert,
  AfterLoad,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productId: string;

  @Column("text")
  title: string;

  @Column("text")
  image: string;

  @Column("numeric", { default: 0 })
  like: number;
}
