import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'

import { Customers } from '../models'
import { CustomersService } from '../services'


@Controller('customers')
export class CustomersController {
   constructor(
      private customers: CustomersService
   ) { }

   @Get()
   async index(@Query('name') name?: string) {
      if (name) return await this.customers.findByName(name)
      return await this.customers.index()
   }

   @Get(':id')
   async findById(@Param('id') id: number) {
      return await this.customers.findById(id)
   }

   @Post()
   async store(@Body() customers: Customers) {
      return await this.customers.store(customers)
   }

   @Put(':id')
   async update(@Param('id') id: number, @Body() name: string) {
      return await this.customers.update(id, name)
   }

   @Delete(':id')
   async delete(@Param('id') id: number) {
      return await this.customers.delete(id)
   }
}