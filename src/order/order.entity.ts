import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()

export class OrderEntity {
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    desc: string

    @Column()
    price: string

    @Column()
    url: string
    
    @Column()
    status?: string

    @Column()
    weight: string
    
    @Column()
    imageUrl: string

    @Column()
    payment?: string

    @Column()
    userId: string

}