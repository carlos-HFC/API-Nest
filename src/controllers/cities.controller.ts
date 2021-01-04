import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import { Cities } from '../models'
import { CitiesService } from '../services'

interface Params {
   city?: string
   uf?: string
}

@Controller('cities')
export class CitiesController {
   constructor(
      private cities: CitiesService
   ) { }

   @Get()
   async index(@Query() params: Params) {
      if (params.city) return await this.cities.findByCity(params.city)
      if (params.uf) return await this.cities.findByUf(params.uf)
      else return await this.cities.index()
   }

   @Post()
   async store(@Body() cities: Cities) {
      return await this.cities.store(cities)
   }
}