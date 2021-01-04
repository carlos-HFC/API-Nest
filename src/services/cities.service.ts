import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Cities } from "../models";

@Injectable()
export class CitiesService {
   constructor(
      @InjectModel(Cities)
      private cities: typeof Cities
   ) { }

   async index(): Promise<Cities[]> {
      return await this.cities.findAll()
   }

   async findByCity(city: string): Promise<Cities> {
      return await this.cities.findOne({
         where: {
            name: city
         }
      })
   }

   async findByUf(uf: string): Promise<Cities[]> {
      return await this.cities.findAll({ where: { uf } })
   }

   async store(cities: Cities): Promise<Cities> {
      return await this.cities.create(cities)
   }
}