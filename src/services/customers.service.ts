import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import sequelize from "sequelize";

import { Cities, Customers } from "../models";

@Injectable()
export class CustomersService {
   constructor(
      @InjectModel(Customers)
      private customers: typeof Customers
   ) { }

   async index(): Promise<Customers[]> {
      return await this.customers.findAll({
         include: [Cities]
      })
   }

   async findById(id: number): Promise<Customers> {
      return await this.customers.findByPk(id)
   }

   async findByName(name: string): Promise<Customers[]> {
      return await this.customers.findAll({ where: { name } })
   }

   async store(customers: Customers): Promise<Customers> {
      return await this.customers.create(customers)
   }

   async update(id: number, name: string): Promise<Customers> {
      const customer = await this.customers.findByPk(id)
      return await customer.update({ name })
   }

   async delete(id: number): Promise<void> {
      const customer = await this.customers.findByPk(id)
      return await customer.destroy()
   }
}