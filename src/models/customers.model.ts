import { differenceInYears, parseISO } from 'date-fns'
import { Column, DataType, Model, Table, ForeignKey, BelongsTo, BeforeSave } from 'sequelize-typescript'

import { Cities } from './cities.model'

@Table
export class Customers extends Model<Customers> {
   @Column({
      type: DataType.STRING,
      allowNull: false
   })
   name: string

   @Column({
      type: DataType.ENUM("M", "F", "O"),
      allowNull: false
   })
   gender: string

   @Column({
      type: DataType.STRING,
      allowNull: false
   })
   birthday: string

   @Column(DataType.INTEGER)
   age: number

   @ForeignKey(() => Cities)
   @Column({
      allowNull: false
   })
   citiesId: number

   @BelongsTo(() => Cities)
   cities: Cities

   @BeforeSave
   static teste(customer: Customers) {
      return customer.age = differenceInYears(new Date(), parseISO(customer.birthday))
   }
}