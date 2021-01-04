import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'
import { Customers } from '.'

@Table
export class Cities extends Model<Cities> {
   @Column({
      type: DataType.STRING,
      allowNull: false
   })
   name: string

   @Column({
      type: DataType.STRING(2),
      allowNull: false
   })
   uf: string

   @HasOne(() => Customers)
   customers: Customers
}