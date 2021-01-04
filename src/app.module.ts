import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { CitiesController, CustomersController } from './controllers';
import { Cities, Customers } from './models'
import { CitiesService, CustomersService } from './services';

const models = [Cities, Customers]
const controllers = [CitiesController, CustomersController]
const providers = [CitiesService, CustomersService]

@Module({
   imports: [
      ConfigModule.forRoot(),
      SequelizeModule.forRoot({
         dialect: "mysql",
         host: process.env.DB_HOST,
         port: 3306,
         username: process.env.DB_USER,
         password: process.env.DB_PASS,
         database: process.env.DB_NAME,
         autoLoadModels: true,
         synchronize: true
      }),
      SequelizeModule.forFeature(models)
   ],
   controllers,
   providers,
})
export class AppModule { }
