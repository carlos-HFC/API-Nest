import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

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

   async update(id: number, body: Customers): Promise<Customers> {
      const customer = await this.customers.findByPk(id)

      if (!customer) throw new HttpException("Esse id não existe", 404)

      return await customer.update({ name: body.name })
   }

   async delete(id: number): Promise<void> {
      const customer = await this.customers.findByPk(id)

      if (!customer) throw new HttpException("Esse id não existe", 404)

      await customer.destroy()
   }
}